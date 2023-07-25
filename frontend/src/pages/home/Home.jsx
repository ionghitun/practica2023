import { useState } from 'react';
import {
	Select,
	Container,
	Flex,
	Pagination,
	Paper,
	Title,
	Card,
	Group,
	Badge,
	Button,
	Image,
	Text,
	SimpleGrid,
	Center,
	TextInput,
} from '@mantine/core';
import Header from '../../components/header';
import MantineFooter from '../../components/footer';
import Tree from '../../components/misc/Tree';
import { useGetCategoriesTreeQuery } from '../../state/categories/api';
import { useGetPublicProductsQuery } from '../../state/products/api';
import { useDebouncedValue } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

export default function Home() {
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('');
	const [opened, setOpened] = useState(false);
	const [activePage, setPage] = useState(1);
	const [orderBy, setOrderBy] = useState('id');
	const [sort, setSort] = useState('ASC');

	const [searchDebounce] = useDebouncedValue(search, 1_000);
	const { data: categories = [] } = useGetCategoriesTreeQuery();
	const { data: products = {} } = useGetPublicProductsQuery({
		search: searchDebounce,
		page: activePage,
		per_page: 10,
		category: filter !== '' ? filter : undefined,
		sort_order: sort,
		sort_by: orderBy,
	});
	const navigate = useNavigate();

	const handleSeeMore = (product) => () => {
		navigate(`/product/${product.id}`);
	};
	const handleCategoryClick = (catId) => {
		if (filter === catId) {
			setFilter('');
		} else {
			setFilter(catId);
		}
		setPage(1);
	};
	const orderOptions = [
		{ value: 'id', label: 'Id' },
		{ value: 'name', label: 'Name' },
		{ value: 'created_at', label: 'Created at' },
		{ value: 'price', label: 'Price' },
		{ value: 'stock', label: 'Stock' },
	];

	return (
		<div>
			<Header opened={opened} setOpened={setOpened} />
			<Container size='lg'>
				<Paper>
					<Title align='center' mb={20}>
						Categorii principale
					</Title>
					{/* <Tree options={categories} /> */}
					<Flex mih={50} gap='md' justify='center' align='center' direction='row' wrap='wrap'>
						{categories?.map((cat) => (
							<Button
								key={cat.id}
								variant='light'
								onClick={() => handleCategoryClick(cat.id)}
								color={filter === cat.id ? 'blue' : 'gray'}
							>
								{cat.name}
							</Button>
						))}
					</Flex>
				</Paper>
				<Paper>
					<Select label='Order By' data={orderOptions} value={orderBy} onChange={setOrderBy} />
					<Select
						label='Sort'
						data={[
							{ value: 'ASC', label: 'Asc' },
							{ value: 'DESC', label: 'Desc' },
						]}
						value={sort}
						onChange={setSort}
					/>
				</Paper>
				<Paper mt='xl'>
					<Title align='center' py='lg'>
						Produse
					</Title>
					<TextInput label='Search' placeholder='Type here' value={search} onChange={(e) => setSearch(e.target.value)} />
					<SimpleGrid cols={4}>
						{products?.data?.map((product) => (
							<Card key={product.id} shadow='sm' padding='lg' radius='md' withBorder>
								<Card.Section>
									<Image src={product?.product_images?.[0]?.image_url} withPlaceholder height={160} alt='Norway' />
								</Card.Section>

								<Group position='apart' mt='md' mb='xs'>
									<Text weight={500}>{product.name}</Text>
									<Badge color='pink' variant='light'>
										{product.price}
									</Badge>
								</Group>

								<Text size='sm' color='dimmed'>
									{product.description}
								</Text>

								<Button variant='light' color='blue' fullWidth mt='md' radius='md' onClick={handleSeeMore(product)}>
									See more
								</Button>
							</Card>
						))}
					</SimpleGrid>
					{!!products?.data?.length && (
						<Center>
							<Pagination value={activePage} onChange={setPage} total={products.last_page} />
						</Center>
					)}
				</Paper>
			</Container>
			<MantineFooter opened={opened} setOpened={setOpened} />
		</div>
	);
}
