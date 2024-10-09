import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setLoading(false);
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    if (!loading) {
        return null; // Render nothing when not loading
    }

    return (
        <div className="preloader-container">
            <div className="circle-container">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
            <div className="preloader-text">
                <span>E</span>
                <span>T</span>
                <span>~</span>
                <span>N</span>
                <span>E</span>
                <span>T</span>
            </div>

            <style jsx>{`
                .preloader-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: #000;
                    z-index: 9999;
                }

                /* Spinning Circles */
                .circle-container {
                    position: relative;
                    width: 200px;
                    height: 200px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .circle {
                    position: absolute;
                    border: 4px solid transparent;
                    border-radius: 50%;
                    animation: spin 1.5s linear infinite;
                }

                .circle:nth-child(1) {
                    border-top-color: #f99526;
                    width: 150px;
                    height: 150px;
                    animation-duration: 2.5s;
                }

                .circle:nth-child(2) {
                    border-top-color: #357bf2;
                    width: 120px;
                    height: 120px;
                    animation-duration: 2s;
                }

                .circle:nth-child(3) {
                    border-top-color: #29cc97;
                    width: 90px;
                    height: 90px;
                    animation-duration: 1.5s;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Preloader Text */
                .preloader-text {
                    font-family: Arial, sans-serif;
                    font-size: 3em;
                    font-weight: bold;
                    letter-spacing: 10px;
                    color: #fff;
                    display: flex;
                    margin-top: 20px;
                }

                .preloader-text span {
                    animation: colorChange 2s ease-in-out infinite;
                }

                .preloader-text span:nth-child(1) { animation-delay: 0s; }
                .preloader-text span:nth-child(2) { animation-delay: 0.2s; }
                .preloader-text span:nth-child(3) { animation-delay: 0.4s; }
                .preloader-text span:nth-child(4) { animation-delay: 0.6s; }
                .preloader-text span:nth-child(5) { animation-delay: 0.8s; }
                .preloader-text span:nth-child(6) { animation-delay: 1s; }

                @keyframes colorChange {
                    0% { color: #f99526; }
                    25% { color: #357bf2; }
                    50% { color: #29cc97; }
                    75% { color: #6c757d; }
                    100% { color: #f99526; }
                }
            `}</style>
        </div>
    );
};

export default Preloader;