import { DynamicIcon } from 'lucide-react/dynamic';
import { Link } from 'react-router-dom';
import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader
} from "@/components/ui/sidebar";

const items = [
    {
        title: 'Dashboard',
        url: '',
        iconName: 'layout-dashboard'
    },
    {
        title: 'Accounts',
        url: '/account/list',
        iconName: 'credit-card',
    },
    {
        title: 'Proration Types',
        url: '/proration-type/list',
        iconName: 'chart-bar-stacked',
    },
    {
        title: 'Items',
        url: '/item/list',
        iconName: 'shapes',
    },
    {
        title: 'Locations',
        url: '/location/list',
        iconName: 'map-pin',
    },
    {
        title: 'Orders',
        url: '/order/list',
        iconName: 'shopping-cart',
    },
    {
        title: 'Routings',
        url: '/routing/list',
        iconName: 'route',
    },
    {
        title: 'Outputs',
        url: '/output/list',
        iconName: 'shopping-basket'
    }
]

export const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent >
                <SidebarHeader>
                    <span className="tracking-widest text-3xl text-center font-bold line-through">
                        Finance
                    </span>
                </SidebarHeader>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild className='w-full justify-start'>
                                <Link to={item.url} className="flex items-center gap-2 ">
                                    <DynamicIcon name={item.iconName} className="!w-auto !h-5 " />
                                    <span className='text-base'>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
