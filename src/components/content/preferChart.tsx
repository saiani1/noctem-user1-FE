import React, { useEffect, useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { IPreferCatergory } from '../../types/user';
import { getPreferCategory } from '../../store/api/popularMenu';
import { tokenState } from '../../store/atom/userStates';
import { useRecoilValue } from 'recoil';

interface IProps {
  setTheBestMenu: React.Dispatch<React.SetStateAction<string>>;
}

function preferChart({ setTheBestMenu }: IProps) {
  const token = useRecoilValue(tokenState);
  const [preferInfo, setPreferInfo] = useState<IPreferCatergory[]>();

  useEffect(() => {
    getPreferCategory(token).then(res => {
      const resData = res.data.data;
      setPreferInfo(resData);

      const max = resData.reduce(
        (prev: { value: number }, current: { value: number }) =>
          prev.value > current.value ? prev : current,
      );

      setTheBestMenu(max.id);
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '280px', margin: '0 auto' }}>
      {preferInfo && (
        <ResponsivePie
          data={preferInfo as IPreferCatergory[]}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          startAngle={-2}
          innerRadius={0.5}
          padAngle={1}
          activeOuterRadiusOffset={8}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
          }}
          arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
          arcLinkLabelsDiagonalLength={10}
          arcLinkLabelsStraightLength={14}
          arcLinkLabelsThickness={3}
          arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
          arcLabelsTextColor={{ theme: 'background' }}
          legends={[]}
        />
      )}
    </div>
  );
}

export default preferChart;
