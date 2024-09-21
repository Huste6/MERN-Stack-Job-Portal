import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSelectedValueFilter } from './redux/jobSlice';

const filterData = [
  {
    filterType: 'Địa điểm', 
    array: ['Hà Nội', 'Nghệ An', 'Đà Nẵng', 'TP.Hồ Chí Minh'],
  },
  {
    filterType: 'Vị trí', 
    array: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState({});
  const dispatch = useDispatch();
  const handleChangeRadio = (dataFilter, value) => {
    const dataFilter1 = (dataFilter === 'Địa điểm' ? ('location') : ('title'))
    setSelectedValue((prev) => ({
      ...prev,
      [dataFilter1]: value,
    }));
  };
  useEffect(()=>{
    dispatch(setSelectedValueFilter(selectedValue));
  },[selectedValue])

  return (
    <div className="w-full bg-white p-5 rounded-lg shadow-md">
      <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
      <hr className="my-3 border-gray-300" />

      {filterData.map((data, index) => (
        <RadioGroup
          key={index}
          onValueChange={(value) => handleChangeRadio(data.filterType, value)}
        >
          <div className="mb-4">
            <h2 className="font-semibold text-lg text-gray-700 mb-2">{data.filterType}</h2>
            {data.array.map((item, index1) => (
              <div key={index1} className="flex items-center space-x-3 my-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item} className="text-gray-600">
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      ))}
    </div>
  );
};

export default FilterCard;