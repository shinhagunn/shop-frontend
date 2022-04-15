import '../assets/styles/components/switch.less';

interface Props {
  check: number;
  func: () => void;
}

function Switch(props: Props) {
  return (
    <div onClick={(e) => {
      e.preventDefault();
      props.func();
    }}
    >
      <label className="switch" htmlFor="abc">
        <input className={props.check === 1 ? 'input' : ''} id="abc" />
        <span className="slider round" />
      </label>
    </div>
  );
}

export default Switch;
