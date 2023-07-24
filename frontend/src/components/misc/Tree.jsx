import React from 'react';
import { Tabs } from '@mantine/core';

function TreeNode({ option, selected, setSelected }) {
	function onSelect(e) {
		e.stopPropagation();
		setSelected(option);
	}

	return (
		<Tabs.Tab value={option.name} active={option === selected} onClick={onSelect}>
			{option.name}
		</Tabs.Tab>
	);
}

export default function Tree({ options, selected, onChange }) {
	return (
		<Tabs active={selected && selected.name} onTabChange={(name) => onChange(options.find((option) => option.name === name))}>
			{options.map((option) => (
				<TreeNode key={option.value} option={option} selected={selected} setSelected={onChange} />
			))}
		</Tabs>
	);
}
