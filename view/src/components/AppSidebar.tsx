import { DynamicIcon } from 'lucide-react/dynamic';

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
                            <SidebarMenuButton asChild>
                                <a href={item.url} className="w-fit h-fit justify-items-stretch ">
                                    <DynamicIcon name={item.iconName} className="!w-auto !h-6 " />
                                    <p className='text-xl'>{item.title}</p>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
