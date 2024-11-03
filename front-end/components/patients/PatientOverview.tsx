import { useRouter } from "next/router";
import { Patient } from "types";


type Props = {
    patients: Array<Patient>;
}

const PatientOverview: React.FC<Props> = ({patients}: Props) => {

    return (
        <>
          {patients && (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Name:</th>
                  <th scope="col">Sex:</th>
                  <th scope="col">Age:</th>
                  <th scope="col">Address:</th>
                  <th scope="col">Email:</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.name} onClick={() => { } } role="button">
                      <td>{patient.sex}</td>
                      <td>{patient.age}</td>
                      <td>{patient.address}</td>
                      <td>{patient.email}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      );
    };

export default PatientOverview;
