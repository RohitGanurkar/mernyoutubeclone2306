import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { setToken } from "../redux/data.js";
import { auth , provider } from "../firebase"
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from 'react-toastify';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState(undefined);
  const [imgPerc, setImagePerc] = useState(0);
  const { accesstoken } = useSelector((state) => state.data);

  const [signupInputs, setSignupInputs] = useState({
    name:"",
    email:"",
    password:"",
    img:""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogin = async(e)=>{
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await axios.post("https://mernyoutubeclone2306.herokuapp.com/api/auth/signin",{name,password});
      dispatch(loginSuccess(res.data.data))
      dispatch(setToken(res.data.accesstoken))
      localStorage.setItem("accesstoken",res.data.accesstoken)
      toast.success("Login Successfull",{
        toastId: 1215612,
        autoClose: 2000,
      })
      console.log(res.data)
      navigate("/")
    } catch (error) {
      dispatch(loginFailure())
    }
  }

  const signInWithGoogle = (e) =>{
    dispatch(loginStart())
    signInWithPopup(auth , provider)
    .then((result)=>{
      axios.post("https://mernyoutubeclone2306.herokuapp.com/api/auth/google" , {
        name:result.user.displayName,
        email:result.user.email,
        img:result.user.photoURL,
      } , {
          headers:{
            accesstoken:localStorage.getItem('accesstoken')
          }
        }).then((res)=>{
        dispatch(loginSuccess(res.data.data))
        localStorage.setItem("accesstoken",res.data.accesstoken)
        toast.success("Login Successfull",{
          toastId: 1215612,
          autoClose: 2000,
        })
        navigate("/")
      })
    })
    .catch((err)=>{
      dispatch(loginFailure())
    })
  }

  const getSignUpInput = (e) =>{
    setSignupInputs({...signupInputs , [e.target.name]:e.target.value})
  }

  const uploadFile = (file) => {
    const storage = getStorage();
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);    
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePerc(Math.round(progress))
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setSignupInputs({...signupInputs , ["img"]: downloadURL})
        });
      }
    );
  };

  const handleSignUp = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("https://mernyoutubeclone2306.herokuapp.com/api/auth/signup",signupInputs);
      if(res.data.success){
        alert("Account is Created")
        setSignupInputs({
          name:"",
          email:"",
          password:"",
          img:""
        })
        toast.success("You are Ragister Successfull",{
          toastId: 1215612,
          autoClose: 2000,
        })
      }else{
        
      toast.error("Something went Wrond",{
        toastId: 1215612,
        autoClose: 2000,
      })
      }
    } catch (error) {
      
      toast.error("Try with Another Name",{
        toastId: 1215612,
        
        autoClose: 4000,
      })
    }
  }

  useEffect(() => {
    img && uploadFile(img);
  }, [img]);

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to YouTube</SubTitle>
        <Input placeholder="username" onChange={(e)=>setName(e.target.value)} />
        <Input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Input placeholder="username" name="name" value={signupInputs.name} onChange={getSignUpInput} />
        <Input placeholder="email" name="email" value={signupInputs.email} onChange={getSignUpInput}  />
        <Input type="password" name="password" value={signupInputs.password} placeholder="password" onChange={getSignUpInput}  />
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button onClick={handleSignUp}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;