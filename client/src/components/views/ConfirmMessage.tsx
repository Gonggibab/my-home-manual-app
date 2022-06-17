import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HttpRequest from '../../HttpRequest';
import { setConfirmToggle, setDeletedStoryTitle } from '../../_actions/story_actions';
import { RootState } from '../../_reducers';



const ConfirmMessage: React.FC = () => {
  const confirmToggle = useSelector((state: RootState) => state.story.confirmToggle);
  const deletedStoryTitle = useSelector((state: RootState) => state.story.deletedStoryTitle);
  const dispatch: any = useDispatch();

  const onDeleteConfirmClicked = () => {
    HttpRequest.post('/api/story/delete', {title: deletedStoryTitle })
    .then(res => {
        if (!res.data.success) {
          console.log("스토리 삭제에 실패하였습니다.")
        } else {
          HttpRequest.post('/api/images/deleteImages', { title: deletedStoryTitle })
          .then(res => {
            if (!res.data.success) {
              console.log("사진 삭제에 실패했습니다!");
            } else {       
              HttpRequest.post('/api/story/getByYear')
              .then(res => {
                  if (!res.data.success) {
                    console.log("스토리 데이터를 불러오지 못했습니다.");
                  } else {
                    console.log("성공적으로 스토리를 삭제하였습니다.");
                  };  
              });
            };    
          });  
        };
    });
    dispatch(setConfirmToggle(!confirmToggle));
  }
  const onCancelConfirmClicked = () => {
    dispatch(setDeletedStoryTitle(""));
    dispatch(setConfirmToggle(!confirmToggle));
  }


  return (
    <div className='ConfirmMessage'>
      <div className='confirm-msg-box'>
        정말로 스토리를 삭제하겠습니까?
        <div className='confirm-buttons'> 
          <button 
            className='delete-confirm-btn' 
            onClick={onDeleteConfirmClicked}
          >
            삭제하겠습니다
          </button>
          <button 
            className='cancel-confirm-btn' 
            onClick={onCancelConfirmClicked}
          >
            취소
          </button>
        </div>
      </div>
    </div>
)};

export default ConfirmMessage;