import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useEffect, useState } from 'react';
import { SelectModule } from './select/SelectModule';

export const ColorResistance = () => {
  const MySwal = withReactContent(Swal);
  const number = [
    { value: 0, name: 'Black' },
    { value: 1, name: 'Brown' },
    { value: 2, name: 'Red' },
    { value: 3, name: 'Orange' },
    { value: 4, name: 'Yellow' },
    { value: 5, name: 'Green' },
    { value: 6, name: 'Blue' },
    { value: 7, name: 'Violet' },
    { value: 8, name: 'Gray' },
    { value: 9, name: 'White' },
  ];
  const [datosMultiplier, setDatosMultiplier] = useState([]);
  const [datosTolerance, setDatosTolerance] = useState([]);
  const [firstBand, setFirstBand] = useState(0);
  const [secondBand, setSecondBand] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const [tolerance, setTolerance] = useState(0);

  useEffect(() => {
    try {
      const fetchData = async () => {
        await axios
          .get('http://localhost:3333/api/data')
          .then((a) => {
            const { data } = a;
            if (data) {
              console.log(data);

              const { dataResponseTolerance, dataResponseMultipliers } = data;

              if (data.success === true) {
                setDatosMultiplier(dataResponseMultipliers);
                setDatosTolerance(dataResponseTolerance);

                MySwal.fire({
                  title: <strong>Good job!</strong>,
                  html: <i>Successfully rendered data</i>,
                  icon: 'success',
                });
              }
            }
          })
          .catch(function (error) {
            if (error.response) {
              MySwal.fire({
                title: <strong>There was an error!</strong>,
                html: <i>I'm sorry, you can reload the page</i>,
                icon: 'error',
              });
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
          });
      };
      fetchData();
    } catch (e) {
      console.log('Error on fetch');
      MySwal.fire({
        title: <strong>There was an error!</strong>,
        html: <i>I'm sorry, you can reload the page</i>,
        icon: 'error',
      });
    }
  }, []);

  const onOptionChangeHandlerFirstBand = (event: any) => {
    setFirstBand(event.target.value);
  };
  const onOptionChangeHandlerSecondBand = (event: any) => {
    setSecondBand(event.target.value);
  };
  const onOptionChangeHandlerMultiplier = (event: any) => {
    setMultiplier(event.target.value);
    console.log(multiplier);
  };
  const onOptionChangeHandlerTolerance = (event: any) => {
    setTolerance(event.target.value);
    console.log(tolerance);
  };

  return (
    <>
      <div className="h-screen w-screen ">
        <div className="flex justify-center pt-10">
          <h1 className="text-3xl text-center">
            4 Band Resistor Color Code Calculator
          </h1>
        </div>
        <div className="grid grid-cols-4 pt-20">
          <div className="col-span-3 flex justify-center relative ">
            <div className="">
              <img
                className="h-32"
                src={'./assets/img/resistor.png'}
                alt="resistor"
              />
            </div>
            <div className="absolute float-left left-64 top-0 z-50">
              <div
                className={` ${
                  firstBand == 0
                    ? 'bg-slate-900 h-32 w-8'
                    : firstBand == 1
                    ? 'bg-amber-900 h-32 w-8'
                    : firstBand == 2
                    ? 'bg-red-600 h-32 w-8'
                    : firstBand == 3
                    ? 'bg-orange-700 h-32 w-8'
                    : firstBand == 4
                    ? 'bg-yellow-400 h-32 w-8'
                    : firstBand == 5
                    ? 'bg-green-700 h-32 w-8'
                    : firstBand == 6
                    ? 'bg-blue-700 h-32 w-8'
                    : firstBand == 7
                    ? 'bg-violet-600 h-32 w-8'
                    : firstBand == 8
                    ? 'bg-gray-600 h-32 w-8'
                    : firstBand == 9
                    ? 'bg-white h-32 w-8'
                    : 'bg-slate-500 h-32 w-8'
                } `}
              ></div>
            </div>
            <div className="absolute float-left left-72 pl-10 top-4 z-50">
              <div
                className={` ${
                  secondBand == 0
                    ? 'bg-slate-900 h-[93px] w-8'
                    : secondBand == 1
                    ? 'bg-amber-900 h-[93px] w-8'
                    : secondBand == 2
                    ? 'bg-red-600 h-[93px] w-8'
                    : secondBand == 3
                    ? 'bg-orange-700 h-[93px] w-8'
                    : secondBand == 4
                    ? 'bg-yellow-400 h-[93px] w-8'
                    : secondBand == 5
                    ? 'bg-green-700 h-[93px] w-8'
                    : secondBand == 6
                    ? 'bg-blue-700 h-[93px] w-8'
                    : secondBand == 7
                    ? 'bg-violet-600 h-[93px] w-8'
                    : secondBand == 8
                    ? 'bg-gray-600 h-[93px] w-8'
                    : secondBand == 9
                    ? 'bg-white tolerance w-8'
                    : 'bg-slate-500 h-[93px] w-8'
                } `}
              ></div>
            </div>
            <div className="absolute float-left left-96 pl-20 top-4 z-50">
              <div
                className={` ${
                  multiplier == 0.001
                    ? 'bg-pink-400 h-[93px]  w-8'
                    : multiplier == 0.01
                    ? 'bg-slate-400 h-[93px]  w-8'
                    : multiplier == 0.1
                    ? 'bg-yellow-400 h-[93px]  w-8'
                    : multiplier == 1
                    ? 'bg-black h-[93px]  w-8'
                    : multiplier == 10
                    ? 'bg-amber-900 h-[93px] w-8'
                    : multiplier == 100
                    ? 'bg-red-600 h-[93px]  w-8'
                    : multiplier == 1000
                    ? 'bg-orange-400 h-[93px]  w-8'
                    : multiplier == 10000
                    ? 'bg-yellow-200 h-[93px]  w-8'
                    : multiplier == 100000
                    ? 'bg-green-500 h-[93px]  w-8'
                    : multiplier == 1000000
                    ? 'bg-blue-700 h-[93px]  w-8'
                    : multiplier == 10000000
                    ? 'bg-violet-700 h-[93px]  w-8'
                    : multiplier == 100000000
                    ? 'bg-gray-500 h-[93px]  w-8'
                    : multiplier == 1000000000
                    ? 'bg-white h-[93px]  w-8'
                    : 'bg-slate-500 h-[93px]  w-8'
                } `}
              ></div>
            </div>
            <div className="absolute float-right right-64 pl-20 top-0 z-50">
              <div
                className={` ${
                  tolerance == 1000
                    ? 'bg-pink-400 h-32 w-8'
                    : tolerance == 10
                    ? 'bg-slate-400 h-32 w-8'
                    : tolerance == 5
                    ? 'bg-yellow-400 h-32 w-8'
                    : tolerance == 10000
                    ? 'bg-black h-32 w-8'
                    : tolerance == 1
                    ? 'bg-amber-900 h-32 w-8'
                    : tolerance == 2
                    ? 'bg-red-600 h-32 w-8'
                    : tolerance == 0.005
                    ? 'bg-orange-400 h-32 w-8'
                    : tolerance == 0.02
                    ? 'bg-yellow-200 h-32 w-8'
                    : tolerance == 0.5
                    ? 'bg-green-500 h-32 w-8'
                    : tolerance == 0.2
                    ? 'bg-blue-700 h-32 w-8'
                    : tolerance == 0.1
                    ? 'bg-violet-700 h-32 w-8'
                    : tolerance == 0.01
                    ? 'bg-gray-500 h-32 w-8'
                    : tolerance == 1000
                    ? 'bg-white h-32 w-8'
                    : 'bg-slate-500 h-32 w-8'
                } `}
              ></div>
            </div>
          </div>
          <div className="w-full justify-center items-center">
            <SelectModule
              title={'First color band'}
              changeHanlder={(e: any) => onOptionChangeHandlerFirstBand(e)}
              data={number}
            />
            <SelectModule
              title={'Second band color'}
              changeHanlder={(e: any) => onOptionChangeHandlerSecondBand(e)}
              data={number}
            />
            <SelectModule
              title={'Select a Multiplier'}
              changeHanlder={(e: any) => onOptionChangeHandlerMultiplier(e)}
              data={datosMultiplier}
            />
            <SelectModule
              title={'Select a Tolerance'}
              changeHanlder={(e: any) => onOptionChangeHandlerTolerance(e)}
              data={datosTolerance}
            />
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <div className="">
            <h1 className="text-3xl text-center"> Result of the operation</h1>
            <br />
          </div>
          <div className="mt-4">
            <h1 className="text-3xl text-center">
              {firstBand && secondBand && multiplier && tolerance
                ? multiplier * (firstBand + secondBand) +
                  ` Ohms ` +
                  tolerance +
                  `%`
                : null}
            </h1>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default ColorResistance;
