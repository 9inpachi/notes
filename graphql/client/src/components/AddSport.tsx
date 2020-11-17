import React, { ChangeEvent, useState } from 'react';

const AddSport: React.FC<{}> = () => {
  const [input, setInput] = useState<{ [key: string]: string }>({});

  const handeChange = (e: ChangeEvent<HTMLInputElement>) => setInput({
    ...input,
    [e.target.name]: e.target.value
  });

  const onAddSport = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
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
