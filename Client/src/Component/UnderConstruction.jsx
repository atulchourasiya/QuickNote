import underConstructionImg from '../Assets/Image/underConstruction.jpg';
import styles from '../Styles/underConstruction.module.css';

const UnderConstruction = () => {
	return (
		<div id='underConstructionContainer' className={`${styles.UCContainer} d-flex align-center justify-center d-none`}
      >
			<img src={underConstructionImg} alt='' />
			<p className={'ff fs-600 fw-bold'}>Feature is Under Construction</p>
			<p className={`${styles.UCText} fs-400`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae porro pariatur eum, qui maiores quia minus! Cum voluptas voluptatibus, distinctio aspernatur similique consequatur velit unde sit ipsam. </p>
			<button onClick={()=>{
				document.getElementById('underConstructionContainer').classList.add('d-none');
			}} className={`${styles.UCButton} pointer`}
			>Go Back</button>
		</div>
	);
};

export default UnderConstruction;
