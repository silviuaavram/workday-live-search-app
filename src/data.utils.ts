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

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
};

export const DATA_SOURCE =
  "https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json";

export async function getData(): Promise<Employee[]> {
  return fetch(DATA_SOURCE).then((response) =>
    response.json().then(({ data, included }: Data) =>
      data.map((employee) => ({
        id: employee.id,
        name: employee.attributes.name,
        firstName: employee.attributes.firstName,
        lastName: employee.attributes.lastName,
        email:
          included.find((account) => account.id === employee.id)?.attributes
            .email ?? "",
      }))
    )
  );
}
