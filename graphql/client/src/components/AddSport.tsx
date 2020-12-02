import { useMutation } from '@apollo/client';
import React, { ChangeEvent, useContext, useState } from 'react';
import SportsContext from '../contexts/SportsContext';
import { addSportQuery } from '../queries';

const AddSport: React.FC = () => {
  const [input, setInput] = useState<{ [key: string]: string }>({});
  const [addSport, { data, loading }] = useMutation(addSportQuery);

  const { sports, setSports } = useContext(SportsContext);

  const [error, setError] = useState('');

  const handeChange = (e: ChangeEvent<HTMLInputElement>) => setInput({
    ...input,
    [e.target.name]: e.target.value
  });

  const onAddSport = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    addSport({
      variables: {
        name: input?.sportName,
        type: input?.sportType,
        rules: input?.sportRules?.split(',').map(rule => rule.trim())
      }
    }).then((res) => {
      const sportsArr = sports ? [...sports] : [];
      sportsArr.push(res.data?.addSport);
      setSports?.(sportsArr);
    }).catch(err => {
      setError('Error adding sport');
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
      {loading && <div className="mt-3 alert alert-info">Adding...</div>}
      {error && <div className="mt-3 alert alert-danger">{error}</div>}
    </form>
  );
};

export default AddSport;
