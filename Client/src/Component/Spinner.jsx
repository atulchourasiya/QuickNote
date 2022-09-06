import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = (props) => {
	return (
		<>
			<div className='d-flex justify-content-center'>
				<ClipLoader color={'var(--list-icon-clr)'} loading={true} size={props.size} />
			</div>
		</>
	);
};

export default Spinner;
