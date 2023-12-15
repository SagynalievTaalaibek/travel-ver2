import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApiTravel from '../../axiosApiTravel';
import FormTour from '../../components/FormTour/FormTour';
import Spinner from '../../components/Spinner/Spinner';
import { Guide, TourCreateForm, UserGet } from '../../types';

const NewTourForm = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [tourData, setTourData] = useState<TourCreateForm>({
    name: '',
    img: '',
    description: '',
    region: 0,
    date: '',
    duration: 0,
    price: 0,
    maxPeople: 0,
    amountPeople: 0,
    guide: '',
  });

  const fetchGuide = useCallback(async () => {
    try {
      const responseGuide = await axiosApiTravel.get<UserGet | null>('users.json?orderBy="role"&equalTo="guide"');
      const dataGuides = responseGuide.data;

      if (!dataGuides) {
        return;
      }

      const newGuids = Object.keys(dataGuides).map((id) => {
        const guide = dataGuides[id];
        return {
          id,
          name: guide.name,
          email: guide.email,
        };
      });

      setGuides(newGuids);

    } catch (e) {
      console.log('Guide fetch error', e);
    }
  }, []);

  useEffect(() => {
    void fetchGuide();
  }, [fetchGuide]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTourData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setTourData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axiosApiTravel.post('tours.json', tourData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setTourData({
        name: '',
        img: '',
        description: '',
        region: 0,
        date: '',
        duration: 0,
        price: 0,
        maxPeople: 0,
        amountPeople: 0,
        guide: '',
      });
    }
  };

  let title = 'Create new tour';

  if (params.id) {
    title = 'Edit Tour';
  }

  return (
    <div className='row'>
      {loading ? <Spinner /> :
        (<FormTour
          title={title}
          guides={guides}
          tourData={tourData}
          onChange={(event) => onChange(event)}
          handleSelectChange={(event) => handleSelectChange(event)}
          onSubmit={(event) => onSubmit(event)}
        />)}
    </div>
  );
};

export default NewTourForm;