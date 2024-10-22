import React, { useEffect, useState } from 'react';
import './Text.scss';

interface TextProps {
  text?: string;
  type: 'title' | 'subtitle' | 'info' | 'link';
  color?: 'main' | 'success' | 'danger' | 'linkColor';
  underline?: boolean;
  remainingTime?: number;
  onClick?: () => void;
  currentPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
}

const Text = ({
  text = '',
  type = 'subtitle',
  color = 'main',
  remainingTime = 0,
  underline = false,
  currentPage,
  itemsPerPage,
  totalItems,
  ...props
}: TextProps) => {
  const [timeLeft, setTimeLeft] = useState(remainingTime);
  useEffect(() => {
    if (remainingTime <= 0) return undefined;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}분 ${seconds}초`;
  };

  // TODO : 부모에게서 해당 처리 함수 받을지 현재 요소에서 처리할지 생각
  // 페이징 텍스트 로직
  // const paginationText =
  //   totalItems !== undefined &&
  //   itemsPerPage !== undefined &&
  //   currentPage !== undefined
  //     ? `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} of ${totalItems} items`
  //     : '';

  const listText =
    totalItems !== undefined &&
    itemsPerPage !== undefined &&
    currentPage !== undefined
      ? `${currentPage}-${itemsPerPage} of ${totalItems} items`
      : '';

  return (
    <div
      className={[
        'text',
        `text__${type}`,
        `text--${color}`,
        underline ? 'text--underline' : '',
      ].join(' ')}
      {...props}
    >
      {text}
      {timeLeft > 0 && (
        <span className="text--red">{formatTime(timeLeft)}</span>
      )}
      {listText && <div className="pagination-text">{listText}</div>}
    </div>
  );
};

export default Text;