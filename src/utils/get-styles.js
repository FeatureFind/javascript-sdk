export const getStyles = (style, settings) => {
  style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

    *,
    *:before,
    *:after {
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      line-height: 1.25;
      -webkit-font-smoothing: antialiased;
    }

    .feature-find__smart-embed {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
      opacity: 0;
      padding: 24px;
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translate(100%, -50%);
      transition: 0.25s ease all;
      width: 300px;
      z-index: 9999;
    }

    .feature-find__smart-embed--in {
      opacity: 1;
      transform: translate(0, -50%);
    }

    .feature-find__smart-embed-close {
      border: none;
      background: none;
      color: #000;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
    }

    .feature-find__smart-embed-close svg {
      height: 24px;
      width: 24px;
    }

    .feature-find__smart-embed-text {
      color: #334155;
      font-weight: 700;
      margin: 0;
    }

    .feature-find__smart-embed-actions {
      display: flex;
      margin-top: 20px;
    }

    .feature-find__smart-embed-action-agree {
      background: #10b981;
      border-radius: 6px;
      border: none;
      color: #fff;
      cursor: pointer;
      margin-left: 5px;
      padding: 8px;
      width: 50%;
    }

    .feature-find__smart-embed-action-agree:hover {
      background: #059669;
    }

    .feature-find__smart-embed-action-agree svg {
      width: 24px;
      height 24px;
    }
    
    .feature-find__smart-embed-action-disagree {
      background: #ef4444;
      border-radius: 6px;
      border: none;
      color: #fff;
      cursor: pointer;
      margin-right: 5px;
      padding: 8px;
      width: 50%;
    }

    .feature-find__smart-embed-action-disagree:hover {
      background: #dc2626;
    }

    .feature-find__smart-embed-action-disagree svg {
      width: 24px;
      height 24px;
    }

    .feature-find__smart-embed-links {
      color: #475569;
      margin: 5px 0 0;
      font-size: 14px;
    }

    .feature-find__smart-embed-links a {
      color: #475569;
      margin: 5px 0 0;
      font-size: 14px;
    }

    .feature-find__smart-embed-links a:hover {
      color: #1e293b;
    }

    .feature-find__loading {
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .feature-find__loading-path {
      transform-origin: center;
      animation: spinner .75s infinite linear
    }

    @keyframes spinner{
      100% {
        transform:rotate(360deg)
      }
    }
  `;

  return style;
};
