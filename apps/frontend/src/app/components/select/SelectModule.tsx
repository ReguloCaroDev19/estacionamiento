import React from 'react';

export const SelectModule = ({
  title,
  changeHanlder,
  data,
}: {
  title: string;
  changeHanlder: React.Dispatch<React.SetStateAction<string | number>>;
  data: any;
}) => {
  return (
    <div className="m-4">
      <h1>{title}</h1>
      <select
        onChange={(e: any) => {
          changeHanlder(e);
        }}
        className="  w-full border-solid border-2 border-indigo-600 rounded-md"
      >
        {data.map((firstValue: any, index: number) => (
          <option key={index} value={firstValue.value}>
            {firstValue.name}
          </option>
        ))}
      </select>
    </div>
  );
};
