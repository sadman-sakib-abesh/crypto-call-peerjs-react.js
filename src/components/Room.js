import React, { useEffect,useRef,useState } from 'react';
import Peer from 'peerjs'
import {nanoid} from 'nanoid'
import CopyToClipboard from'react-copy-to-clipboard'

const Room =()=>{
  const [mediaStream,setStream]=useState('')
 const [data,setData]=useState('')
const [audio,setAudio]=useState(true)
const [video,setVideo]=useState(true)
const [user,setUser]=useState('')
const videoRef=useRef(null)
const selfRef=useRef(null)
const id=nanoid()
 const peer= new Peer(id)
 
 


  
  
 

  

useEffect(()=>{
  peer.on('call', function(call) {
  
    navigator.mediaDevices
    .getUserMedia({video:true,audio:true})
    .then(stream => {
      let self=selfRef.current
      self.srcObject=stream
      self.play()
      setStream(stream)
      call.answer(stream); // Answer the call with an A/V stream.
      call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
        let vid=videoRef.current
    vid.srcObject=remoteStream
        vid.play()    
      })
    
    
    
    
    }).catch(err=>{
    console.log(err)
    })
    })
  
})


const play=()=>{
  mediaStream.getVideoTracks().forEach(element => {
    element.enabled=true
  });
}

const stop=()=>{
  mediaStream.getVideoTracks().forEach(element => {
    element.enabled=false
  });
}
const Aplay=()=>{
  mediaStream.getAudioTracks().forEach(element => {
    element.enabled=true
  });
}

const Astop=()=>{
  mediaStream.getAudioTracks().forEach(element => {
    element.enabled=false
  });
}


const call=()=>{

  
    navigator.mediaDevices
  .getUserMedia({video:true,audio:true})
  .then(stream => {
    setStream(stream)
    let self=selfRef.current
    self.srcObject=stream
    self.play()
    var call = peer.call(user, stream);
  call.on('stream', function(remoteStream) {

var vid=videoRef.current
vid.srcObject=remoteStream
vid.play()
  })
}).catch(err=>{
  console.log(err)
  })
  




}

const share=()=>{

  
  navigator.mediaDevices
.getDisplayMedia({video:true,audio:true})
.then(stream => {
  setStream(stream)
  let self=selfRef.current
  self.srcObject=stream
  self.play()
  var call = peer.call(user, stream);
call.on('stream', function(remoteStream) {

var vid=videoRef.current
vid.srcObject=remoteStream
vid.play()
})
}).catch(err=>{
console.log(err)
})





}




  return(
<div>
  <nav id='header'>&nbsp;&nbsp;&nbsp;crypto-call </nav>
  <br/><br/><br/>
  <center>
    <div id='copy'>
  <CopyToClipboard text={id} onCopy={()=>alert('copied')}>
 <span> {id} &nbsp;&nbsp;<i class="fa fa-clone"></i> </span>
        </CopyToClipboard>
        </div>
  <br/>
 <br/>
<input id='in' type='text' placeholder='dial id' onChange={(e)=>setUser(e.target.value)}/><br/>
<span id='i-1'><i id='call' class='fas fa-phone' onClick={()=>call()}/></span>
 <br/>
<video ref={selfRef} ></video>&nbsp;&nbsp;<video ref={videoRef} ></video>
 
  <br/>
  <span id='i-2'>{video?<i class='fas fa-video' id='call' onClick={()=>{stop();setVideo(false)}}></i>:<i class='fas fa-video-slash' id='call' onClick={()=>{play();setVideo(true)}}></i>}
      </span>
  <span id='i-2'>{audio?<i class='fas fa-microphone'  id='call' onClick={()=>{Astop();setAudio(false)}}></i>:<i class='fas fa-microphone-slash'  id='call' onClick={()=>{Aplay();setAudio(true)}}></i>}</span>
  <span id='i-3'><i class='fas fa-arrow-alt-circle-up'   id='call' onClick={()=>{share()}}></i> </span>
 
    
</center>

</div>
  )
    
  
}

export default Room;