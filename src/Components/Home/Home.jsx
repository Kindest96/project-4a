import React from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import useWebAnimations, { bounceInUp, fadeOut, fadeIn } from "@wellyshen/use-web-animations";


const Home = () => {
    const navigate = useNavigate();

    const { keyframes, timing } = bounceInUp;
    const { keyframes: fadeOutKeyframes, timing: fadeOutTiming } = fadeOut;
    const { keyframes: fadeInKeyframes, timing: fadeInTiming } = fadeIn;
    
    const { ref: whereToRef, animate: whereToAnimate } = useWebAnimations();


    const { ref: first, animate: firstAnimate } = useWebAnimations({
        keyframes,
        timing: {
            ...timing,
        },
    });
    const { ref: second, animate: secondAnimate  } = useWebAnimations({
        keyframes,
        timing: {
            ...timing,
            delay: 600, // Delay 1s
        },
    });
    const { ref: thrid, animate: thridAnimate } = useWebAnimations({
        id: "bounceInUp",
        keyframes,
        timing: {
            ...timing,
            delay: 1200
        },
        onFinish: ({ playState, animate, animation }) => {
            if (animation.id === "disappear") return;
            
            firstAnimate({
                keyframes: fadeOutKeyframes,
                timing: {
                    ...fadeOutTiming,
                    duration: 750,
                    iterations: 1,
                    fill: "forwards"
                }
            });
            secondAnimate({
                keyframes: fadeOutKeyframes,
                timing: {
                    ...fadeOutTiming,
                    duration: 750,
                    iterations: 1,
                    fill: "forwards"
                }
            });
            thridAnimate({
                id: "disappear",
                keyframes: fadeOutKeyframes,
                timing: {
                    ...fadeOutTiming,
                    duration: 750,
                    iterations: 1,
                    fill: "forwards"
                },
            });
            whereToAnimate({
                keyframes: fadeInKeyframes,
                timing: {
                    ...fadeInTiming,
                    delay: 1200,
                    duration: 750,
                    iterations: 1,
                    fill: "forwards"
                }
            });

        },
    });


    return (
        <div className='container background'>

            <div className='container first-block'>
            <h1 ref={first}>Welcome to</h1>
            <h1 ref={second}>Asif Nawaz's</h1>
            <h1 ref={thrid}>Web Animation Project</h1>
            </div>

            <div className='container second-block' ref={whereToRef}>
                <h1>Where to?</h1>
                <h1>
                    <span className='text' onClick={()=> navigate('/Race')}>Race</span>
                </h1>
            </div>
                
        </div>
        )
    }

export default Home
