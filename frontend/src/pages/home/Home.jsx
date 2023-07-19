import { useState } from 'react';
import { Container, Pagination, Paper, Title } from '@mantine/core';
import Header from '../../components/header';
import Tree from '../../components/misc/Tree';
import { useGetCategoriesTreeQuery } from '../../state/categories/api';
import { useGetPublicProductsQuery } from '../../state/products/api';

export default function Home() {
	const [opened, setOpened] = useState(false);
	const [activePage, setPage] = useState(1);

	const { data: categories = [] } = useGetCategoriesTreeQuery();
	const { data: products = {} } = useGetPublicProductsQuery({ page: activePage });

	return (
		<div>
			<Header opened={opened} setOpened={setOpened} />
			<Container size='lg'>
				<Paper>
					<Title align='center'>Categorii principale</Title>
					<Tree options={categories} />
				</Paper>
				<Paper mt='xl'>
					<Title align='center'>Produse</Title>
					{!!products?.data?.length && <Pagination value={activePage} onChange={setPage} total={products.last_page} />}
				</Paper>
			</Container>
		</div>
	);
}
