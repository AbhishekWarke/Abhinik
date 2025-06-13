import React from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function BackgroundEffect() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true },
        background: {
          color: {
            value: "#f9f9f9", // Very light background like notesbuddy
          },
        },
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#9b5de5", // Purple color dots
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: 4,
            random: true,
          },
          move: {
            enable: true,
            speed: 2,
            attract: {
              enable: false,
            },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#9b5de5",
            opacity: 0.4,
            width: 1,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // cursor effect
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            repulse: {
              distance: 100,
            },
          },
        },
      }}
    />
  );
}

export default BackgroundEffect;
