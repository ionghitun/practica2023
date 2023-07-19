import { List, Stack } from '@mantine/core';

function TreeNode({ option, selected, setSelected }) {
	function onSelect(e) {
		e.stopPropagation();
		setSelected(option);
	}

	return (
		<List.Item onClick={onSelect}>
			<Stack style={{ backgroundColor: option === selected && '#4dabf733' }}>{option.name}</Stack>
			{/* <List listStyleType='none' withPadding style={{ borderLeft: '2px solid #ddd' }}>
				{option.subCategories?.map((child, i) => (
					<TreeNode option={child} key={i} selected={selected} setSelected={setSelected} />
				))}
			</List> */}
		</List.Item>
	);
}

export default function Tree({ options, selected, onChange }) {
	return (
		<List listStyleType='none' withPadding>
			{options.map((option) => (
				<TreeNode key={option.value} option={option} selected={selected} setSelected={onChange} />
			))}
		</List>
	);
}
