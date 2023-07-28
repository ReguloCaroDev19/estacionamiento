import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useEffect, useState } from 'react';

export const Estacionamiento = () => {
  const MySwal = withReactContent(Swal);

  const [datosMultiplier, setDatosMultiplier] = useState([]);
  const [datosTolerance, setDatosTolerance] = useState([]);

  useEffect(() => {
    try {
      const fetchData = async () => {
        await axios
          .get('http://localhost:3333/api/data')
          .then((a) => {
            const { data } = a;
            if (data) {
              const { dataResponseMultipliers, dataResponseTolerance } = data;

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
      console.log('error en hacer fetch');
      MySwal.fire({
        title: <strong>There was an error!</strong>,
        html: <i>I'm sorry, you can reload the page</i>,
        icon: 'error',
      });
    }
  }, []);

  return (
    <>
      <div className="h-full w-full">
        <div className="flex justify-center items-end">
          <select>
            {datosMultiplier.map((dataMapMultiplier: any) => (
              <option value={dataMapMultiplier.value}>
                {dataMapMultiplier.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select>
            {datosTolerance.map((dataMapTolerance: any) => (
              <option value={dataMapTolerance.value}>
                {dataMapTolerance.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Estacionamiento;
