import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { setDisplayImageIndex } from '../../_actions/story_actions';


const StoryContent: React.FC = () => {
  const dispatch: any = useDispatch();

  const [expandToggle, setExpandToggle] = useState<string>("image-box");
  const images = useSelector((state: RootState) => state.story.images);
  const displayImageIndex = useSelector((state: RootState) => state.story.displayImageIndex);

  const onImageClick = () => {
    if (expandToggle === "image-box") {
      setExpandToggle("image-expand");
    } else {
      setExpandToggle("image-box");
    }
  };

  const renderImages = images.map((image: any, index) => {
    return (
      <div 
        key={image.filename} 
        className={(index === displayImageIndex) ? 'display fade' : 'no-display fade' }
      >
        <img 
          key={image.filename} 
          src={`http://localhost:5000/${image.filepath}`} 
          alt='unloaded'
          onClick={onImageClick} 
        />
      </div>      
    );        
  });    

  const flipImg = (i: number) => {
    // make images keep rotate
    let idx = displayImageIndex + i
    if (idx < 0) idx = images.length - 1
    if (idx > images.length - 1) idx = 0

    dispatch(setDisplayImageIndex(idx));
  }

  return (
    <div className='StoryContent'>
      { images.length !== 0 && 
        <div className={expandToggle}>
          <BsChevronLeft 
            className='btn-left'
            size={30}
            onClick={() => flipImg(-1)} 
          />
          <div className='story-image'>
            {renderImages}            
          </div>
          <BsChevronRight
            className='btn-right'
            size={30}
            onClick={() => flipImg(1)} 
          />
          { expandToggle === "image-box" &&
            <label>사진을 클릭해서 확대 / 축소 해보세요</label>
          }          
        </div>        
      }      
    </div>
  );
}

export default StoryContent