export function LoggedOutShell({ header, title, description, children }: { header: React.ReactNode, title: string, description: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      { header != null && header }
        
      <div className="flex flex-col max-w-[427px] w-full self-center mt-16 md:mt-32">
        <h1 className="text-3xl font-bold mb-2">{ title }</h1>

        <p className="text-base text-on-background-dimmed">{ description }</p>

        <hr className="border-on-background-border my-4" />

        { children }
      </div>
    </div>
  )
}