import './StoryManage.css';
import HttpRequest from '../../../HttpRequest';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../_reducers';
import { BsSearch, BsTrashFill } from 'react-icons/bs';
import { 
  setAddStoryToggle, 
  setConfirmToggle, 
  setDeletedStoryTitle, 
  setEditStoryTitle, 
  setEditStoryToggle 
} from '../../../_actions/story_actions';
import StoryUpload from '../StoryUpload';
import StoryEdit from '../StoryEdit';
import ConfirmMessage from '../ConfirmMessage';


const StoryManage: React.FC = () => { 
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector((state: RootState) => state.user.payload.isLogin);
  const addStoryToggle = useSelector((state: RootState) => state.story.addStoryToggle);  
  const editStoryToggle = useSelector((state: RootState) => state.story.editStoryToggle);
  const confirmToggle = useSelector((state: RootState) => state.story.confirmToggle);
  const [searchInput, setSearchInput] = useState<string>("");
  const [storyList, setStoryList] = useState([]);
  const [yearFilterList, setyearList] = useState<Array<string>>([]);
  const [selectedFilter, setSelectedFilter] = useState<Array<string>>([]);
 
  // check user login
  useEffect(() => {    
    if (!isLogin) navigate('/');
  }, [isLogin, navigate]);

  useEffect(() => {
    HttpRequest.post('/api/story/getByYear')
    .then(res => {
        if (!res.data.success) {
          console.log("스토리 데이터를 불러오지 못했습니다.")
        } else {
          // remove duplicating year in the array
          let list = res.data.stories.map((story: { year: string; }) => story.year)
          let years: Array<string> = Array.from(new Set(list.sort()))

          setStoryList(res.data.stories);
          setyearList(years);
        };
    });
  }, [addStoryToggle, editStoryToggle, confirmToggle])
  
  

  const onSearchHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };
  const onAddStoryClicked = () => {
    dispatch(setAddStoryToggle(!addStoryToggle));
  };
  const onBackClicked = () => {
    navigate('/story');
  };
  const onEditStoryClicked = (title: string) => {
    dispatch(setEditStoryToggle(!editStoryToggle));
    dispatch(setEditStoryTitle(title));
  };
  const onDeleteStoryClicked = (title: string) => {
    dispatch(setDeletedStoryTitle(title));
    dispatch(setConfirmToggle(!confirmToggle));
  };
  

  const onFilterItemClicked = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (e.currentTarget.checked) {
      setSelectedFilter(selectedFilter.concat(e.currentTarget.value));
    } else {
      setSelectedFilter(selectedFilter.filter(val => val !== e.currentTarget.value));
    }
  };
  const onFilterSearchClicked = () => {
    HttpRequest.post('/api/story/getByYear', selectedFilter)
    .then(res => {
        if (!res.data.success) {
          console.log("스토리 데이터를 불러오지 못했습니다.")
        } else {
          setStoryList(res.data.stories);
        };  
    });
  };

  const onSearchClicked = () => {
    let body = {
      text: searchInput
    }
    HttpRequest.post('/api/story/search', body)
    .then(res => {
        if (!res.data.success) {
          console.log("스토리 데이터를 불러오지 못했습니다.")
        } else {
          setStoryList(res.data.stories);
        };        
    });
  };


  const yearFilterItems = yearFilterList.map((year: string) => {
    return (
      <label key={year}>
        <input 
          type="checkbox" 
          value={year} 
          onClick={(e) => onFilterItemClicked(e)} 
        />
          {year}
      </label>
    );
  });

  const storyItems = storyList.map((story: any, index: any) => {
    return (
      <div key={story._id} className='manage-story'>
        <h3>{story.year}년</h3>
        <h2>{story.title}</h2>       
        <button onClick={() => onEditStoryClicked(story.title)}>
          수정
        </button>
        <button 
          className='story-delete-btn'
          onClick={() => onDeleteStoryClicked(story.title)}
        >
          <BsTrashFill size={15}/>
        </button> 
      </div>
    );
  });

  return (
    <div className='StoryManage'>

      { !addStoryToggle && !editStoryToggle &&
        <div className='manage-filter'>
          <h2>스토리 필터</h2>
          <label>년도</label>
          <div className='year-ckbox'>
            {yearFilterItems}
          </div>
          <button onClick={onFilterSearchClicked}>
            검색
            <BsSearch />
          </button>
        </div>
      }
      
      { !addStoryToggle && !editStoryToggle &&
        <div className='manage-content'>
          <div className='manage-header'>
            <input 
              type='text' 
              placeholder='스토리 제목을 검색하세요' 
              value={searchInput}
              onChange={(e) => onSearchHandle(e)}
            />
            <button 
              className='search-btn' 
              onClick={onSearchClicked}
            >
              <BsSearch size={18} />
            </button>
            <button 
              className='add-btn' 
              onClick={onAddStoryClicked}
            >
              새 스토리 추가
            </button>
            <button 
              className='back-btn' 
              onClick={onBackClicked}
            >
              뒤로
            </button>
          </div>
          
          
          <h2>스토리 리스트</h2>
          <div className='manage-list'>
            {storyItems}
          </div>
        </div>
      }

      { addStoryToggle && 
        <StoryUpload />
      }

      { editStoryToggle &&
        <StoryEdit />
      }

      { confirmToggle &&
        <ConfirmMessage />
      }
      
    </div>          
  )};

export default StoryManage;