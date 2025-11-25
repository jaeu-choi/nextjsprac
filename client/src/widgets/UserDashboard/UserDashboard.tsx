type UserDashboardProps = {
  user: {
    name: string;
  };
};

export function UserDashboard({ user }: UserDashboardProps) {
  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mb-8">Continue your learning journey</p>

        {/* 수강 중인 강의 섹션 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
          <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-500">
            수강 중인 강의가 없습니다
          </div>
        </div>

        {/* 로드맵 섹션 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Roadmap</h2>
          <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-500">
            로드맵을 설정해보세요
          </div>
        </div>
      </div>
    </section>
  );
}
