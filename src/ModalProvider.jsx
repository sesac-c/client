import useModalStore from '../src/stores/modalStore';

const ModalProvider = () => {
  const modals = useModalStore(state => state.modals);

  return (
    <>
      {modals.map(({ id, element }) => (
        <Component key={id} component={element} />
      ))}
    </>
  );
};

const Component = ({ component, ...rest }) => {
  return component({ ...rest });
};

export default ModalProvider;
