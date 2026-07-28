import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function AdminStatsCards({ stats }) {
  const cards = [
    {
      title: "Total Users",
      value: stats?.total_users ?? 0,
    },
    {
      title: "Active Users",
      value: stats?.active_users ?? 0,
    },
    {
      title: "Inactive Users",
      value: stats?.inactive_users ?? 0,
    },
    {
      title: "Admin Users",
      value: stats?.admin_users ?? 0,
    },
    {
      title: "Applications",
      value: stats?.total_applications ?? 0,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 mb-6">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              {card.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}