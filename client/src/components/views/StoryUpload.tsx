import React, { useEffect, useState } from 'react';
import HttpRequest from '../../HttpRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import { useDropzone } from 'react-dropzone'
import { setAddStoryToggle } from '../../_actions/story_actions';
import { convertFileSize } from '../util/convertFileSize';


const StoryUpload: React.FC = () => { 
  // 기본 년도를 위한 현재 년도 계산
  let now = new Date();
  let curYear = now.getFullYear().toString();

  const dispatch: any = useDispatch();
  const userOId = useSelector((state: RootState) => state.user.payload._id)
  const addStoryToggle = useSelector((state: RootState) => state.story.addStoryToggle);
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<string>(curYear);
  const [images, setImages] = useState<Array<string>>([]);
  const [errMsg, setErrMsg] = useState<string>("");
  
  useEffect(() => {   
      HttpRequest.post('/api/images/getByTitle', { title: "unlinked" })
      .then(res => {
        if (!res.data.success) {
          console.log("이미지를 불러오지 못했습니다.");
        } else {
          setImages(res.data.images);
        };  
      });         
  }, []);

  const onTitleHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setErrMsg("");
  };
  const onYearHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.currentTarget.value);
    setErrMsg("");
  };
  const onStoryBackClicked = () => {
    HttpRequest.post('/api/images/deleteImages', { title: "unlinked" })
    .then(res => {
      if (!res.data.success) {
        console.log("사진 삭제에 실패했습니다!");
      } else {       
        dispatch(setAddStoryToggle(!addStoryToggle));
      };    
    });  
  };

  const onImgDeleteClicked = (filepath: string) => {
    HttpRequest.post('/api/images/deleteImage', { filepath: filepath })
    .then(res => {
      if (!res.data.success) {
        console.log("사진 삭제에 실패했습니다!");
      } else {       
        HttpRequest.post('/api/images/getByTitle', { title: "unlinked" })
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

  const onSaveClicked = () => {
    // check every required input
    if (title === "" || year === "") {
      setErrMsg("제목과 년도 모두 입력해 주세요!");
    } else {

      // save story to the database
      const story = {
        title: title,
        year: year
      };
      HttpRequest.post('/api/story/add', story)
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
              prevTitle: "unlinked", 
              newTitle: title
            };
            HttpRequest.post('/api/images/updateLinkTitle', body)
            .then(res => {
              if (!res.data.success) {
                console.log("이미지 업데이트에 실패하였습니다.");
              } else {
                dispatch(setAddStoryToggle(!addStoryToggle));
              };  
            });            
          }; 
      });
    };
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
        console.log('이미지 저장에 실패하였습니다!')
        setErrMsg("오류가 발생하였습니다! 다시 시도해주세요!")
      } else {
        let images = res.data.files.map((file: any) => {
          return {
            filename: file.filename,
            filepath: file.path,
            linkTitle: "unlinked",
            uploader: userOId,
            mimetype: file.mimetype,
            originalname: file.originalname,
            size: convertFileSize(file.size)
          }
        });

        HttpRequest.post('/api/images/uploadImages', images)
        .then(res => {
          if(!res.data.success) {    
            console.log('이미지 저장에 실패하였습니다!')
            setErrMsg("오류가 발생하였습니다! 다시 시도해주세요!")
          } else {
            console.log('이미지 저장에 성공했습니다.')

            HttpRequest.post('/api/images/getByTitle', { title: "unlinked" })
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
    <div className='StoryUpload'>
  
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
              스토리 저장
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
        <h2>업로드 할 사진</h2>
        <div className='images-grid'>
          {imageItems}
        </div>
      </div>      

    </div>          
)};



export default StoryUpload;