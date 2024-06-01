"use client";

import { HospitalData } from '../../types/hospitalData';

interface HospitalTableProps {
  data: HospitalData[];
}

const HospitalTable: React.FC<HospitalTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Specialisatie</th>
            <th>Locatie</th>
            <th>Intake Wachttijd (weken)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.specialization}</td>
              <td>{item.location}</td>
              <td>{item.intakeTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalTable;
