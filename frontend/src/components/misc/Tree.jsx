import { List, Stack } from '@mantine/core';
import { Card, Image,SimpleGrid, Text, Badge, Button, Group } from '@mantine/core';
import { useState } from 'react';

function TreeNode({ option, selected, setSelected }) {
	function onSelect(e) {
		e.stopPropagation();
		setSelected(option.id);
	}

	const [isHovered, setIsHovered] = useState(false);

	function onSelect() {
	  setSelected(option.id);
	}
  
	function onMouseEnter() {
	  setIsHovered(true);
	}
  
	function onMouseLeave() {
	  setIsHovered(false);
	}

	return (
		<List.Item onClick={onSelect} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ cursor: 'pointer', background: isHovered ? '#f1f1f1' : 'transparent' }}>
			<SimpleGrid cols={4}>
					<Group hover={isHovered} position="apart" mt="md" mb="xs">
						<Text weight={500}>{option.name}</Text>
					</Group>
			</SimpleGrid>
		</List.Item>
	);
}

export default function Tree({ options, selected, onChange }) {
	return (
		<>
		<List listStyleType='none' withPadding>
			{options.map((option) => (
				<TreeNode key={option.value} option={option} selected={selected} setSelected={onChange} />
			))}
		</List>
		</>
	);
}
