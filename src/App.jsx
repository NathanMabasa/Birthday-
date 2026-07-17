import React, { useState, useRef, useEffect } from 'react'

export default function App(){
  const [noClicked, setNoClicked] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const noRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(()=>{
    const noBtn = noRef.current
    if(!noBtn) return
    let interval
    if(!noClicked){
      interval = setInterval(()=>{
        noBtn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-6px)' }, { transform: 'translateY(0)'}], { duration: 1200 })
      },3000)
    }
    return ()=> clearInterval(interval)
  },[noClicked])

  function handleNoClick(){
    if(!noClicked){
      setNoClicked(true)
      setShowModal(true)
    } else {
      moveAway()
    }
  }

  function moveAway(){
    const noBtn = noRef.current
    if(!noBtn) return
    const rect = noBtn.getBoundingClientRect()
    const btnW = rect.width, btnH = rect.height
    const padding = 20
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const left = Math.floor(Math.random() * (vw - btnW - padding*2)) + padding
    const top = Math.floor(Math.random() * (vh - btnH - padding*2)) + padding
    noBtn.style.position = 'fixed'
    noBtn.style.left = left + 'px'
    noBtn.style.top = top + 'px'
    noBtn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-8px)' }, { transform: 'translateY(0)'}], { duration: 360 })
  }

  const [rickSrc, setRickSrc] = useState(null)

  function handleYes(){
    if(buttonsRef.current) buttonsRef.current.style.display = 'none'
    // set the iframe src on interaction to improve autoplay reliability
    setRickSrc('https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0')
    setShowMessage(true)
    startConfetti()
  }

  function startConfetti(){
    const confetti = document.getElementById('confetti')
    if(!confetti) return
    const colors = ['#ffd166','#06d6a0','#ef476f','#118ab2','#3a7bd5','#ff6bcb']
    for(let i=0;i<36;i++){
      const el = document.createElement('i')
      el.style.background = colors[i % colors.length]
      el.style.left = Math.random()*100 + '%'
      el.style.top = '-' + (Math.random()*20) + 'vh'
      el.style.animationDelay = (Math.random()*2) + 's'
      el.style.width = (8 + Math.random()*10) + 'px'
      el.style.height = (12 + Math.random()*12) + 'px'
      el.style.opacity = 0.9
      el.style.transform = 'rotate(' + (Math.random()*360) + 'deg)'
      confetti.appendChild(el)
    }
    setTimeout(()=>{ while(confetti.firstChild) confetti.removeChild(confetti.firstChild); },7000)
  }

  // convert user link to embed src
  const rickEmbed = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0'

  // prevent scroll when modal open
  useEffect(()=>{
    if(showModal) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return ()=>{ document.body.style.overflow = '' }
  },[showModal])

  return (
    <div className="card">
      <h1>Quick question:</h1>
      <p className="lead">Will you pay me 2 billion Rands tomorrow?</p>
      <div className="buttons" ref={buttonsRef}>
        <button ref={noRef} className={`noBtn ${!noClicked? 'pulse':''}`} onClick={handleNoClick} onMouseEnter={()=>{ if(noClicked) moveAway() }}>No, of course not!</button>
        <button className="yesBtn" onClick={handleYes}>Yes (sure?)</button>
      </div>

      {showMessage && (
        <div className="message show">
          <div className="birthday">Happy Birthday Kayley — enjoy your birthday!</div>
          <div style={{marginTop:12}}>Enjoy this special surprise:</div>
          <div style={{marginTop:16}}>
            {rickSrc ? (
              <iframe id="rick" width="560" height="315" src={rickSrc} title="Rickroll" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{maxWidth:'100%',height:315,borderRadius:10,marginTop:12}}></iframe>
            ) : null}
          </div>
        </div>
      )}

      <div id="modal" className={`modal ${showModal? 'show':''}`}>
        <div className="inner">
          <img src={'/first.jpg'} className="cute-img full" alt="first" onClick={()=>setShowModal(false)} />
        </div>
      </div>

      <div id="confetti" className="confetti" aria-hidden="true"></div>
    </div>
  )
}
