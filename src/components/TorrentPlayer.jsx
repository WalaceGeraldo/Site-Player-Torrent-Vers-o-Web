import React, { useState, useRef, useEffect } from 'react';


const TorrentPlayer = ({ initialMagnetLink = '' }) => {
    const [magnetLink, setMagnetLink] = useState(initialMagnetLink);
    const playerContainerRef = useRef(null);

    useEffect(() => {
        if (magnetLink && playerContainerRef.current) {
            if (window.webtor) {
                window.webtor.push({
                    id: 'player-container',
                    magnet: magnetLink,
                    width: '100%',
                    height: '100%',
                    features: {
                        continue: false,
                        subtitles: true,
                        p2p: true, // Attempt P2P but fallback to HTTP
                    },
                    on: {
                        ready: () => console.log('Webtor player ready'),
                        play: () => console.log('Playback started'),
                        error: (e) => console.error('Webtor error:', e)
                    },
                    lang: 'pt-BR',
                    i18n: {
                        en: {
                            common: {
                                "prepare_to_play": "Preparando reprodução...",
                            }
                        }
                    }
                });
            } else {
                console.warn('Webtor SDK not loaded yet');
            }
        }
    }, [magnetLink]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            padding: '20px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '1000px', // Increased max-width for better cinema feel
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    fontSize: '2rem',
                    fontWeight: '700',
                    background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    margin: 0
                }}>
                    Player de Torrent (Web)
                </h1>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <input
                        type="text"
                        value={magnetLink}
                        onChange={(e) => setMagnetLink(e.target.value)}
                        placeholder="Cole o Link Magnet aqui..."
                        style={{
                            flex: 1,
                            padding: '12px 20px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            background: 'rgba(0, 0, 0, 0.2)',
                            color: 'white',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>

                <div
                    id="player-container"
                    ref={playerContainerRef}
                    style={{
                        width: '100%',
                        aspectRatio: '16/9',
                        background: '#000',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    {!magnetLink && (
                        <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255,255,255,0.3)'
                        }}>
                            <p>Cole um link magnet para começar</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TorrentPlayer;


