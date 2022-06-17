import './StoryPage.css';
import StoryContent from '../StoryContent';
import StorySelect from '../StorySelect';
import { useSelector } from 'react-redux';
import { RootState } from '../../../_reducers';
import img2009 from '../../../Images/Satellite/2009.png';
import img2011 from '../../../Images/Satellite/2011.png';
import img2014 from '../../../Images/Satellite/2014.png';
import img2017 from '../../../Images/Satellite/2017.png';
import img2019 from '../../../Images/Satellite/2019.png';

const StoryPage: React.FC = () => { 
  const years = useSelector((state: RootState) => state.story.years);
  const yearIndex = useSelector((state: RootState) => state.story.yearIndex);

  const setImage = () => {
    if ( Number(years[yearIndex]) < 2011 ) { 
      return img2009;
    } else if ( Number(years[yearIndex]) < 2014 ) {
      return img2011;
    } else if ( Number(years[yearIndex]) < 2017 ) {
      return img2014;
    } else if ( Number(years[yearIndex]) < 2019 ) {
      return img2017;
    } else {
      return img2019;
    };      
  };

  return (
    <div className='StoryPage'>
      <div className='bg-img'>
        <img 
          id='story-bg-img'
          src={setImage()} 
          alt='fail to load'>
        </img>
      </div>      
      <StorySelect />
      <StoryContent />      
    </div>
  );
}

export default StoryPage