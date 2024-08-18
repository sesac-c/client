import Input from '../../../common/UI/Input.jsx';

const ReplyInput = () => {
  const handleReplySubmit = e => {
    e.preventDefault();
    // 댓글 작성 로직
  };

  return (
    <Input
      variant='custom'
      size='small'
      type='text'
      placeholder='댓글 달기'
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handleReplySubmit(e);
        }
      }}
    />
  );
};

export default ReplyInput;
