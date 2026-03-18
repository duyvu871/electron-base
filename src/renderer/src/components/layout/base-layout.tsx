import { Layers, Settings, Sparkles } from 'lucide-react'
import { type PropsWithChildren } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type BaseLayoutProps = PropsWithChildren<{
    appTitle: string
    appSubtitle: string
}>

const navItems = ['Dashboard', 'Requests', 'Forms', 'Settings']

export const BaseLayout = ({ appTitle, appSubtitle, children }: BaseLayoutProps): JSX.Element => {
    return (
        <div className="min-h-screen p-4 md:p-6">
            <div className="mx-auto grid w-full max-w-7xl gap-4 lg:grid-cols-[280px_1fr]">
                <Card className="border-slate-300/80 bg-white/75 p-4 backdrop-blur md:p-5">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white">
                                <Layers size={16} />
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">Starter Shell</p>
                                <p className="text-xs text-slate-600">Shadcn Base</p>
                            </div>
                        </div>
                        <Badge variant="secondary">v1</Badge>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item, index) => (
                            <button
                                className="flex w-full items-center justify-between rounded-md border border-transparent px-3 py-2 text-left text-sm text-slate-700 transition hover:border-slate-200 hover:bg-white"
                                key={item}
                                type="button"
                            >
                                <span>{item}</span>
                                {index === 0 && <Sparkles size={14} />}
                            </button>
                        ))}
                    </nav>

                    <Card className="mt-6 border-slate-200/90 bg-white p-3">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Layout Rule</p>
                        <p className="mt-1 text-sm text-slate-700">Use this shell as default app frame for all new features.</p>
                    </Card>
                </Card>

                <div className="space-y-4">
                    <Card className="border-slate-300/80 bg-white/80 p-4 backdrop-blur md:p-5">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm text-slate-500">Workspace</p>
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{appTitle}</h1>
                                <p className="mt-1 text-sm text-slate-600">{appSubtitle}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline">
                                    Preview
                                </Button>
                                <Button size="sm" variant="secondary">
                                    <Settings className="mr-2" size={14} />
                                    Settings
                                </Button>
                                <Button size="sm">New Action</Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-slate-300/80 bg-white/85 p-4 md:p-5">{children}</Card>
                </div>
            </div>
        </div>
    )
}
