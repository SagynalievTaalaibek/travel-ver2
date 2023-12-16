import React, { useCallback, useEffect, useState } from 'react';
import axiosApiTravel from '../../axiosApiTravel';
import TravelItem from '../../components/TravelItem/TravelItem';
import Categories from '../../components/Categories/Categories';
import Skeleton from '../../components/Skeleton/Skeleton';
import { TourApi, TourCard } from '../../types';

interface Props {
  isAdmin: boolean;
}

const Home: React.FC<Props> = ({isAdmin}) => {
  const [travels, setTravels] = useState<TourCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState('');

  const fetchData = useCallback(async (region: string) => {
    setLoading(true);

    let link: string = 'tours.json';

    if (region !== 'all') {
      link += `?orderBy="region"&equalTo="${region}"`;
    }

    try {
      const responseTours = await axiosApiTravel.get<TourApi | null>(link);
      const dataTours = responseTours.data;

      if (!dataTours) {
        return;
      }

      const newTours = Object.keys(dataTours).map((id) => {
        const tours = dataTours[id];

        return {
          ...tours,
          id,
        };
      });

      setTravels(newTours);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (region === '') {
      void fetchData('all');
    } else {
      void fetchData(region);
    }

  }, [fetchData, region]);

  const deleteTour = async (id: string) => {
    setLoading(true);
    try {
      const answer = confirm('Do yoy really want delete this tour?');
      if (answer) {
        await axiosApiTravel.delete('tours/' + id + '.json');
        setTravels((prevState) => prevState.filter(value => value.id !== id));
      }
    } catch (e) {
      alert('Delete id error' + e);
    } finally {
      setLoading(false);
    }
  };

  const countTravel = () => {
    console.log('Press button');
  };

  const travelsList = travels.map((travel: TourCard) => {
    return <TravelItem admin={isAdmin} {...travel} key={travel.id} onBook={countTravel} deleteTour={deleteTour} />;
  });

  return (
    <>
      <Categories
        onClick={(region) => setRegion(region)}
      />
      <div className='row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1'>
        {loading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : travelsList}
      </div>
    </>
  );
};

export default Home;