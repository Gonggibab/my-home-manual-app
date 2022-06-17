import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import { useDropzone } from 'react-dropzone'
import HttpRequest from '../../HttpRequest';
import { setEditStoryTitle, setEditStoryToggle } from '../../_actions/story_actions';
import { convertFileSize } from '../util/convertFileSize';

const StoryEdit: React.FC = () => { 
  const dispatch: any = useDispatch();
  const userOId = useSelector((state: RootState) => state.user.payload._id)
  const editStoryToggle = useSelector((state: RootState) => state.story.editStoryToggle);
  const editStoryTitle = useSelector((state: RootState) => state.story.editStoryTitle);
  const [images, setImages] = useState<Array<string>>([]);
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  
  
  useEffect(() => {
    HttpRequest.post('/api/story/getOneStory', { text: editStoryTitle })
    .then(res => {
        if (!res.data.success) {
          console.log("스토리 데이터를 불러오지 못했습니다.");
        } else {
          setTitle(res.data.story.title);
          setYear(res.data.story.year);
  
          HttpRequest.post('/api/images/getByTitle', { title: res.data.story.title })
          .then(res => {
            if (!res.data.success) {
              console.log("이미지를 불러오지 못했습니다.");
            } else {
              setImages(res.data.images);
            };  
          });
        };    
    });
  }, [editStoryTitle]);
  
  
  const onTitleHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setErrMsg("");
  };
  const onYearHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.currentTarget.value);
    setErrMsg("");
  };

  const onStoryBackClicked = () => {
    dispatch(setEditStoryToggle(!editStoryToggle));
    dispatch(setEditStoryTitle(""));
  };

  const onImgDeleteClicked = (filepath: string) => {
    HttpRequest.post('/api/images/deleteImage', { filepath: filepath })
      .then(res => {
        if (!res.data.success) {
          console.log("사진 삭제에 실패했습니다!");
        } else { 
          HttpRequest.post('/api/images/getByTitle', { title: title })
          .then(res => {
            if (!res.data.success) {
              console.log("이미지를 불러오지 못했습니다.");
            } else {
              setImages(res.data.images);
            };  
          });             
        };    
      });
  };  


  const onDrop = (files: Array<File>) => {
    // save images to the server 
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    const config: any = {
      header: {'content-type': 'multipart/form-data'}
    };
    HttpRequest.post('/api/images/uploadFiles', formData, config)
    .then(res => {
      if(!res.data.success) {    
        console.log('이미지 서버전송에 실패하였습니다')
        setErrMsg("오류가 발생하였습니다! 다시 시도해주세요!")
      } else {     
        let body = res.data.files.map((file: any) => {       
          return {
            filename: file.filename,
            filepath: file.path,
            linkTitle: title,
            uploader: userOId,
            mimetype: file.mimetype,
            originalname: file.originalname,
            size: convertFileSize(file.size)
          };
        });
        
        // save images to the database
        HttpRequest.post('/api/images/uploadImages', body)
          .then(res => {
            if(!res.data.success) {
              console.log('이미지 저장에 실패하였습니다');
              console.log(res.data);          
              setErrMsg("오류가 발생하였습니다! 다시 시도해주세요!")
            } else {              
              console.log('이미지가 성공적으로 저장되었습니다');

              HttpRequest.post('/api/images/getByTitle', { title: title })
              .then(res => {
                if (!res.data.success) {
                  console.log("이미지를 불러오지 못했습니다.");
                } else {
                  setImages(res.data.images);
                };  
              });
            };
        });
      };
    }); 
    setErrMsg("");
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/png': ['.png']
    },
    onDrop: (acceptedFiles) => onDrop(acceptedFiles)
  });


  const onSaveClicked = () => {
    // check every required input
    if (title === "" || year === "") {
      setErrMsg("제목과 년도 모두 입력해 주세요!");
    } else {

      // save story to the database
      const story = {
        prevTitle: editStoryTitle,
        title: title,
        year: year
      };
      HttpRequest.post('/api/story/udpate', story)
      .then(res => {
          if (!res.data.success) {
            if (res.data.err.code === 11000) {
              setErrMsg(
                "중복되는 스토리 제목입니다. 다른 제목을 입력해주세요!"
              );
            } else {
              setErrMsg("오류가 발생하였습니다. 다시 시도해주세요!");
            };
          } else {
            const body = {
              prevTitle: editStoryTitle, 
              newTitle: title
            };
            HttpRequest.post('/api/images/updateLinkTitle', body)
            .then(res => {
              if (!res.data.success) {
                console.log("이미지 업데이트에 실패하였습니다.");
              } else {
                dispatch(setEditStoryToggle(!editStoryToggle));
              };  
            });            
          }; 
      });
    };
  };


  const imageItems = images.map((image: any, index) => {
    return (
      <div 
        key={image.filename} 
        className='prev-image-box'
      >
        <img 
          src={`http://localhost:5000/${image.filepath}`} 
          alt='unloaded' 
        />
        <button onClick={() => onImgDeleteClicked(image.filepath)}>
          삭제
        </button>
      </div>      
    );        
  });  




  return (
    <div className='StoryEdit'>
      
      <div className='edit-content'>
        <div className='story-content'>
          <div className='story-inputs'>
            <label>
              스토리 제목 *
              <input 
                className='title-input'
                type='text' 
                value={title}
                onChange={(e) => onTitleHandle(e)}>
              </input> 
            </label>
            <label>
              년도 *
              <input 
                className='year-input'
                type='text' 
                value={year}
                onChange={(e) => onYearHandle(e)}>
              </input> 
            </label>
          </div>         
          
          <div className='manage-buttons'>
            <button className='story-save-btn' onClick={onSaveClicked}>
              스토리 수정
            </button> 
            <button className='story-back-btn' onClick={onStoryBackClicked}>
              뒤로
            </button> 
          </div>

          <div className='err-msg'>
            {errMsg}
          </div>
        </div>

        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          사진을 이곳에 드래그하거나 클릭해서<br/>사진을 추가해 보세요
        </div>
      </div>
      
      <div className='edit-images'>
        <h2>기존 사진 수정</h2>
        <div className='images-grid'>
          {imageItems}
        </div>
      </div>      

    </div>          
  )};

export default StoryEdit;