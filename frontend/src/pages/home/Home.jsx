import { useState } from 'react';
import { Badge, Button, Card, Center, Container, Group, Image, Pagination, Paper, SimpleGrid, ActionIcon, Text, TextInput, Title } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import Header from '../../components/header';
import Tree from '../../components/misc/Tree';
import { useGetCategoriesTreeQuery } from '../../state/categories/api';
import { useGetPublicProductsQuery } from '../../state/products/api';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';

export default function Home() {
	const [search, setSearch] = useState('');
	const [opened, setOpened] = useState(false);
	const [activePage, setPage] = useState(1);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [sortOrder, setSortOrder] = useState('ASC');
	const [sortColumn, setSortColumn] = useState('id');
  

	const [debouncedSearch] = useDebouncedValue(search, 1_000);

	const { data: categories = [] } = useGetCategoriesTreeQuery();
	const { data: products = {} } = useGetPublicProductsQuery({ search: debouncedSearch, page: activePage, per_page: 8, category: selectedCategory,sort_by: sortColumn,sort_order: sortOrder, });


	const handleSortChange = (column) => {
		if (column === sortColumn) {
			setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
		} else {
			setSortOrder('ASC');
			setSortColumn(column);
		}
	};
	const handleResetSort = () => {
		setSortColumn('id');
		setSortOrder('ASC');
	  };

	const navigate = useNavigate();

	const handleCategoryFilter = (categoryId) => {
		setSelectedCategory(categoryId);
		console.log(categoryId);
	  };
	const handleResetCategoryFilter = () => {
		setSelectedCategory(null);
	};
	
	const handleDetailProduct = (id) => () => {
		navigate(`/product/${id}`);
	};

	return (
		<div>
			<Header opened={opened} setOpened={setOpened} />
			<Container size='lg'>	
				<Paper shadow="sm" padding="1g" mt="1g" >
					<Title align='center'>Categorii principale</Title>
					<Button onClick={handleResetCategoryFilter} color="cyan" shadow='sm' mb='md' padding='1g' radius='md' withBorder style={{ marginLeft: '16px' }}>
						Toate categoriile 
					</Button>
					<Tree options={categories} selected={selectedCategory} onChange={handleCategoryFilter}/>		
				</Paper>
				<Paper mt='xl' p='lg'>
					<Title align='center' py='lg'>
						Produse
					</Title>
					<Group position="apart" mb="md">
						<Group position="center" spacing="xs">
							<Button
								variant="outline"
								color={sortColumn === 'name' ? 'blue' : 'gray'}
								onClick={() => handleSortChange('name')}
							>
								Nume {sortColumn === 'name' && (sortOrder === 'ASC' ? '>' : '<')}
							</Button>
							<Button color={sortColumn === 'name' ? 'cyan' : 'gray'}variant="outline" onClick={handleResetSort}>
								X
							</Button>
						</Group>
					</Group>

					<TextInput label='Search' placeholder='Type here' value={search} onChange={(e) => setSearch(e.target.value)} mb='md' />
					<SimpleGrid cols={4}>
						{products?.data?.map((product) => (
							<Card key={product.id} component="a" onClick={handleDetailProduct(product.id)} shadow='sm' padding='lg' href="" radius='md' withBorder>
								<Card.Section>
									<Image src={product?.product_images?.[0]?.image_url} withPlaceholder height={160} alt='Norway' />
								</Card.Section>
								<Group position='apart' mt='md' mb='xs'>
									<Text weight={500}>{product.name}</Text>
									<Badge color='pink' variant='light'>
										On Sale
									</Badge>
								</Group>
								<Text size='sm' color='dimmed'>
									{product.description}
								</Text>
							</Card>
						))}
					</SimpleGrid>
					{!!products?.data?.length && (
						<Center>
							<Pagination py='lg' value={activePage} onChange={setPage} total={products.last_page} />
						</Center>
					)}
				</Paper>
			</Container>
			<Footer></Footer>
		</div>
	);
}
