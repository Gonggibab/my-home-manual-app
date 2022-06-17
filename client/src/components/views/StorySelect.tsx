import React, {useEffect, useState} from 'react';
import HttpRequest from '../../HttpRequest';
import { Link } from 'react-router-dom';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import { 
  setDisplayImageIndex,
  setImage, 
  setStory, 
  setYearIndex, 
  setYears
} from '../../_actions/story_actions';


const StorySelect: React.FC = () => {  
  const dispatch: any = useDispatch();
  const yearIndex = useSelector((state: RootState) => state.story.yearIndex);
  const years = useSelector((state: RootState) => state.story.years);
  const stories = useSelector((state: RootState) => state.story.stories);  
  const isLogin = useSelector((state: RootState) => state.user.payload.isLogin);
  const [activeButton, setActiveButton] = useState<string>("active-list");
  
  useEffect(() => {
    HttpRequest.post('/api/story/getByYear')
    .then(res => {
        if (!res.data.success) {
          console.log("스토리 데이터를 불러오지 못했습니다.")
        } else {
          // remove duplicating year in the array
          let list = res.data.stories.map((story: { year: string; }) => story.year)
          let years: Array<string> = Array.from(new Set(list.sort()))
          dispatch(setYears(years));          
        };
    }); 
  }, [dispatch]);


  useEffect(() => {   
    HttpRequest.post('/api/story/getByYear', [years[yearIndex]])
    .then(res => {
      if(!res.data.success) {
        console.log(res.data.err)
      } else {
        dispatch(setStory(res.data.stories));
      }            
    });        
  }, [dispatch, yearIndex, years]);


  const onPrevYearClicked = () => {    
    dispatch(setYearIndex(yearIndex - 1));
    dispatch(setImage([]));
    dispatch(setDisplayImageIndex(0));
    setActiveButton("active-list");
    const element = document.getElementById("story-bg-img")
    if (element != null) element.style.filter = "grayscale(20%)";  
  };
  const onNextYearClicked = () => {
    dispatch(setYearIndex(yearIndex + 1));
    dispatch(setImage([]));
    dispatch(setDisplayImageIndex(0));
    setActiveButton("active-list");
    const element = document.getElementById("story-bg-img")
    if (element != null) element.style.filter = "grayscale(20%)"; 
  };

  const onStoryClicked = (
    e: React.MouseEvent<HTMLButtonElement>, 
    title: string
    ) => {
      dispatch(setDisplayImageIndex(0));
      
      let list = e.target as HTMLButtonElement;
      setActiveButton(list.className);

      const element = document.getElementById("story-bg-img")
      if (element != null) {
        if(list.className !== 'active-list') {         
          element.style.filter = "grayscale(100%)";

          HttpRequest.post('/api/images/getByTitle', { title: title })
          .then(res => {
            if(!res.data.success) {
              console.log(res.data) 
            };
            dispatch(setImage(res.data.images));
          });            
        } else {
          element.style.filter = "grayscale(20%)";
          dispatch(setImage([])); 
        };
      };      
  };

  const storyListItems: any = stories.map((story: any) => (
    <li 
      key={story._id} 
      className={story._id === activeButton ? "active-list" : story._id}
      onClick={(e: any) => onStoryClicked(e, story.title)}
    >
      {story.title}
    </li>
  ));

  return (
    <div className='StorySelect'>
        <div className='story-year fade'>
          <div className='year-btn'>
            { !(yearIndex === 0) && (
              <BsChevronUp size={20} onClick={onPrevYearClicked} />
            )}    
          </div>
          <h2>
            { years[yearIndex] + '년' }
          </h2>
          <div className='year-btn'>
            { yearIndex < years.length - 1 && (
              <BsChevronDown size={20} onClick={onNextYearClicked} />
            )}  
          </div>               
        </div>
        {isLogin &&
          <Link 
            to={"/storyManage"}>
            스토리 관리
          </Link>      
        }  
        <ul className='story-list'>
            {storyListItems}
        </ul>

    </div>      
  );
}

export default StorySelect