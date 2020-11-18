import { useMutation } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react';
import { addSportQuery } from '../queries';

const AddSport: React.FC<{}> = () => {
  const [input, setInput] = useState<{ [key: string]: string }>({});
  const [addSport, { data }] = useMutation(addSportQuery);

  const handeChange = (e: ChangeEvent<HTMLInputElement>) => setInput({
    ...input,
    [e.target.name]: e.target.value
  });

  const onAddSport = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSport({
      variables: {
        name: input?.sportName,
        type: input?.sportType,
        rules: input?.sportRules.split(',').map(rule => rule.trim())
      }
    }).finally(() => {
      console.log(data);
    });
  };

  return (
    <form className="add-sports" onSubmit={onAddSport}>
      <div className="form-group">
        <label htmlFor="sportName">Name</label>
        <input type="text" className="form-control" id="sportName" name="sportName" onChange={handeChange} />
      </div>
      <div className="form-group">
        <label htmlFor="sportType">Type</label>
        <input type="text" className="form-control" id="sportType" name="sportType" onChange={handeChange} />
      </div>
      <div className="form-group">
        <label htmlFor="sportRules">Rules (separated by comma)</label>
        <input type="text" className="form-control" id="sportRules" name="sportRules" onChange={handeChange} />
      </div>
      <button type="submit" className="btn btn-primary">Add Sport</button>
    </form>
  );
};

export default AddSport;
