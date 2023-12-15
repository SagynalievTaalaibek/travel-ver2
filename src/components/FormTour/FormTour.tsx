import React from 'react';
import { Guide, TourCreateForm } from '../../types';
import { regionsEng } from '../../constant';

interface Props {
  title: string;
  guides: Guide[];
  tourData: TourCreateForm;
  onSubmit: (event: React.FormEvent) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormTour: React.FC<Props> = ({title, guides, tourData, onSubmit, onChange, handleSelectChange}) => {
  return (
    <>
      <form className='col-md-6 card py-2' onSubmit={onSubmit}>
        <h3 className='mx-auto'>{title}</h3>
        <div className='mb-3 input-group'>
          <label htmlFor='name' className='input-group-text' style={{ width: '100px' }}>
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            className='form-control'
            required
            value={tourData.name}
            onChange={onChange}
          />
        </div>
        <div className='mb-3 input-group'>
          <label htmlFor='img' className='input-group-text' style={{ width: '100px' }}>
            Image
          </label>
          <input
            type='text'
            name='img'
            id='img'
            className='form-control'
            required
            value={tourData.img}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <textarea
            name='description'
            placeholder='Description'
            id='description'
            className='form-control'
            required
            value={tourData.description}
            onChange={onChange}
          />
        </div>
        <div className='mb-3 input-group'>
          <label htmlFor='region' className='input-group-text' style={{ width: '100px' }}>
            Role
          </label>
          <select
            name='region'
            id='region'
            className='form-select'
            required
            value={tourData.region}
            onChange={handleSelectChange}
          >
            <option value=''>Select Region</option>
            {regionsEng.map((region, index) => (
              <option value={region.toLocaleLowerCase()} key={index}>{region}</option>
            ))}
          </select>
        </div>
        <div className='mb-3 input-group'>
          <label htmlFor='date' className='input-group-text' style={{ width: '100px' }}>
            Date
          </label>
          <input
            type='date'
            name='date'
            id='date'
            className='form-control'
            required
            value={tourData.date}
            onChange={onChange}
          />
        </div>
        <div className='mb-3 input-group'>
          <label htmlFor='duration' className='input-group-text' style={{ width: '100px' }}>
            Duration
          </label>
          <input
            type='number'
            name='duration'
            id='duration'
            className='form-control'
            required
            value={tourData.duration}
            onChange={onChange}
          />
        </div>
        <div className='mb-3 input-group'>
          <label htmlFor='price' className='input-group-text' style={{ width: '100px' }}>
            Price
          </label>
          <input
            type='number'
            name='price'
            id='price'
            className='form-control'
            required
            value={tourData.price}
            onChange={onChange}
          />
        </div>
        <div className='mb-3 input-group'>
          <label htmlFor='maxPeople' className='input-group-text' style={{ width: '100px' }}>
            Max People
          </label>
          <input
            type='number'
            name='maxPeople'
            id='maxPeople'
            className='form-control'
            required
            value={tourData.maxPeople}
            onChange={onChange}
          />
        </div>
        <div className='mb-3 input-group'>
          <label htmlFor='guide' className='input-group-text' style={{ width: '100px' }}>
            Role
          </label>
          <select
            name='guide'
            id='guide'
            className='form-select'
            required
            value={tourData.guide}
            onChange={handleSelectChange}
          >
            <option value=''>Select Guide</option>
            {guides.map(guide => (
              <option value={guide.id} key={guide.id}>{guide.name}</option>
            ))}
          </select>
        </div>
        <button className='btn btn-primary'>Save</button>
      </form>
    </>
  );
};

export default FormTour;