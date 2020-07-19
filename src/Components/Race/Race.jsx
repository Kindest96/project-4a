import React from 'react';
import useWebAnimations from "@wellyshen/use-web-animations";
import "./Race.css";
import alice from "./images/sprite_running-alice-queen_small.png";
import palm1 from "./images/palm1_small.png";
import palm2 from "./images/palm2_small.png";
import palm3 from "./images/palm3_small.png";
import bushSmall from "./images/bush_small.png";
import wRookUprightSmall from "./images/w_rook_upright_small.png";
import rPawnUprightSmall from "./images/r_pawn_upright_small.png";
import wRookSmall from "./images/w_rook_small.png";
import rPawnSmall from "./images/r_pawn_small.png";
import rKnightSmall from "./images/r_knight_small.png";
import { useEffect } from 'react';

const Race = () => {
    const roundTo1Point = (num) => {
        return Math.round(num * 1e1 ) / 1e1;
    }

    const skyFrames =   [
        { backgroundPosition: '-500% 100%' },
        { backgroundPosition: '500% 100%' }   
    ];

    const skyTiming = {
        direction: 'reverse',
        duration: 288000,
        iterations: Infinity,
    };

    const frames =   [
        { transform: 'translateX(100%)' },
        { transform: 'translateX(-100%)' }   
    ];
      
    const backgroundTiming = {
        duration: 36000,
        iterations: Infinity
    };
    
    const foregroundTiming = {
        duration: 12000,
        iterations: Infinity
    };

    const aliceFrames = [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-100%)' },
    ];

    const aliceTiming = {
        easing: 'steps(7, end)',
        direction: "reverse",
        duration: 1200,
        playbackRate: 1,
        iterations: Infinity
    };

    const {ref: skyAnimationRef, playState: skyAnimation, getAnimation: getSkyAnimation} = useWebAnimations({keyframes: skyFrames, timing: skyTiming});
    
    const { ref: background1AnimationRef, playState: background1Animation, getAnimation: getBackground1Animation} = useWebAnimations({keyframes: frames, timing: backgroundTiming});
    const {ref: background2AnimationRef, playState: background2Animation, getAnimation: getBackground2Animation} = useWebAnimations({keyframes: frames, timing: backgroundTiming});
    
    const {ref: foreground1AnimationRef, playState: foreground1Animation, getAnimation: getForeground1Animation} = useWebAnimations({keyframes: frames, timing: foregroundTiming});
    const {ref: foreground2AnimationRef, playState: foreground2Animation, getAnimation: getForeground2Animation} = useWebAnimations({keyframes: frames, timing: foregroundTiming});
    
    const { ref: aliceAnimationRef, playState: aliceAnimation, getAnimation: getAliceAnimation } = useWebAnimations({keyframes: aliceFrames, timing: aliceTiming});

    useEffect(() => {
        getBackground1Animation().currentTime = getBackground1Animation().effect.getComputedTiming().duration / 2;
        getForeground1Animation().currentTime = getForeground1Animation().effect.getComputedTiming().duration / 2;
    })

    const sceneries = [getSkyAnimation(), getBackground1Animation(), getBackground2Animation(), getForeground1Animation(), getForeground2Animation()];

    const adjustBackgroundSpeed = () => {
        sceneries.forEach((animationItems) => {
            if (animationItems) {
                if (getAliceAnimation().playbackRate < 0.8 && getAliceAnimation().playbackRate > 0.4) {
                    animationItems.updatePlaybackRate(roundTo1Point(getAliceAnimation().playbackRate / 4));
                } else if (getAliceAnimation().playbackRate > 1.2) {
                    animationItems.updatePlaybackRate(roundTo1Point(getAliceAnimation().playbackRate / 2));
                }
            }
        });
    }


    const goFaster = () => {
        console.log(getAliceAnimation().playbackRate);
        if (getAliceAnimation().playbackRate <= 64.0) {
            getAliceAnimation().updatePlaybackRate(roundTo1Point(getAliceAnimation().playbackRate * 1.1));
            adjustBackgroundSpeed();
        }
    };

    const goSlower = () => {
        console.log(getAliceAnimation().playbackRate);
        if (getAliceAnimation().playbackRate >= 0.4) {
            getAliceAnimation().updatePlaybackRate(roundTo1Point(getAliceAnimation().playbackRate * 0.9));
            adjustBackgroundSpeed();
        }
    };

    setInterval(() => {
        goSlower();
    }, 5000);

    document.addEventListener('keydown', (key) => {
        switch (key.key) {
                case ' ':
                case 'w':
                case 'W':
                case 'ArrowUp':
                    goFaster();
                    break;
                
                case 'S':
                case 's':
                case 'ArrowDown':
                    goSlower();
                    break;
            
                default:
                    break;
        }
    });
    
    return (
        <div className="wrapper">
        <div className="sky" id="sky" ref={skyAnimationRef}></div>
        <div className="earth">
            <div id="queen_with_alice" onClick={() => goFaster()}>
                    <img src={alice} alt=" " id="queen_with_alice_sprite" ref={aliceAnimationRef} />
            </div>
        </div>



        
        <div className="scenery" id="foreground1" ref={foreground1AnimationRef}>
            <img src={palm3} alt=" " id="palm3" />
        </div>

        <div className="scenery" id="foreground2" ref={foreground2AnimationRef}>
            <img src={bushSmall} alt=" " id="bush" />
            <img src={wRookUprightSmall} alt=" " id="white_rook_upright" />
        </div>



        <div className="scenery" id="background1" ref={background1AnimationRef}>
            <img src={rPawnUprightSmall} alt=" " id="red_pawn_upright" />
            <img src={wRookSmall} alt=" " id="white_rook" />
            <img src={palm1} alt=" " id="palm1" />
        </div>

        <div className="scenery" id="background2" ref={background2AnimationRef}>
            <img src={rPawnSmall} alt=" " id="red_pawn" />
            <img src={rKnightSmall} alt=" " id="red_knight" />
            <img src={palm2} alt=" " id="palm2" />
        </div>

    </div>
    )
}

export default Race
