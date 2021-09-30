import React, { useEffect } from "react";

type Data = {
  data: {
    id: string;
    attributes: {
      firstName: string;
      lastName: string;
      name: string;
    };
  }[];
  included: {
    attributes: {
      email: string;
    };
    id: string;
  }[];
};

enum Status {
  Idle,
  Loading,
  Error,
  Success,
}

type UseDataResult = {
  data: Employee[];
  errorMessage: string;
  status: Status;
};

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
};

export const DATA_SOURCE =
  "https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json";

export function useData(): UseDataResult {
  const [status, setStatus] = React.useState(Status.Idle);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [data, setData] = React.useState<Employee[]>([]);

  useEffect(() => {
    setStatus(Status.Loading);

    fetch(DATA_SOURCE).then(async (response) => {
      if (!response.ok) {
        response.json().then(({ message }: { message: string }) => {
          setErrorMessage(message);
          setStatus(Status.Error);
        });
      } else {
        response.json().then(({ data, included }: Data) => {
          setData(
            data.map((employee) => ({
              id: employee.id,
              name: employee.attributes.name,
              firstName: employee.attributes.firstName,
              lastName: employee.attributes.lastName,
              email:
                included.find((account) => account.id === employee.id)
                  ?.attributes.email ?? "",
            }))
          );
          setStatus(Status.Success);
        });
      }
    });
  }, []);

  return {
    data,
    errorMessage,
    status,
  };
}
