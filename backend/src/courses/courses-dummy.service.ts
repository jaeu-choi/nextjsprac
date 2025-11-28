import { Injectable } from '@nestjs/common';

export interface DummyCourse {
  id: string;
  title: string;
  thumbnailUrl: string;
  instructorName: string;
  rating: number;
  reviewCount: number;
  price: number;
  isFree: boolean;
  category: string;
  level: string;
  description: string;
}

@Injectable()
export class CoursesDummyService {
  private readonly courses: DummyCourse[] = [
    {
      id: '1',
      title: 'React 완벽 가이드 - 기초부터 실전까지',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=React',
      instructorName: '김코딩',
      rating: 4.8,
      reviewCount: 1234,
      price: 77000,
      isFree: false,
      category: 'it-programming',
      level: 'beginner',
      description: 'React의 기초부터 고급 개념까지 배우는 완벽한 강의',
    },
    {
      id: '2',
      title: 'TypeScript 마스터 클래스',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=TypeScript',
      instructorName: '이타입',
      rating: 4.9,
      reviewCount: 856,
      price: 55000,
      isFree: false,
      category: 'it-programming',
      level: 'intermediate',
      description: 'TypeScript를 제대로 배우는 실무 중심 강의',
    },
    {
      id: '3',
      title: 'Next.js 14 완전 정복',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=NextJS',
      instructorName: '박넥스트',
      rating: 4.7,
      reviewCount: 623,
      price: 0,
      isFree: true,
      category: 'it-programming',
      level: 'intermediate',
      description: 'Next.js 14의 모든 기능을 다루는 무료 강의',
    },
    {
      id: '4',
      title: 'Node.js 백엔드 개발 입문',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=NodeJS',
      instructorName: '최노드',
      rating: 4.6,
      reviewCount: 945,
      price: 44000,
      isFree: false,
      category: 'it-programming',
      level: 'beginner',
      description: 'Node.js로 백엔드 개발을 시작하는 입문 강의',
    },
    {
      id: '5',
      title: '파이썬 데이터 분석 기초',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Python+Data',
      instructorName: '정데이터',
      rating: 4.8,
      reviewCount: 1567,
      price: 0,
      isFree: true,
      category: 'data-science',
      level: 'beginner',
      description: '파이썬으로 데이터 분석을 시작하는 기초 강의',
    },
    {
      id: '6',
      title: 'Figma UI/UX 디자인 실전',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Figma',
      instructorName: '강디자인',
      rating: 4.7,
      reviewCount: 789,
      price: 33000,
      isFree: false,
      category: 'productivity',
      level: 'intermediate',
      description: 'Figma를 활용한 실무 UI/UX 디자인',
    },
    {
      id: '7',
      title: 'Docker & Kubernetes 완벽 가이드',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Docker+K8s',
      instructorName: '윤데브옵스',
      rating: 4.9,
      reviewCount: 534,
      price: 88000,
      isFree: false,
      category: 'it-programming',
      level: 'advanced',
      description: 'Docker와 Kubernetes를 마스터하는 고급 강의',
    },
    {
      id: '8',
      title: 'ChatGPT 활용 업무 자동화',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=ChatGPT',
      instructorName: '김AI',
      rating: 4.5,
      reviewCount: 2341,
      price: 0,
      isFree: true,
      category: 'ai-util',
      level: 'beginner',
      description: 'ChatGPT로 업무를 자동화하는 실용 강의',
    },
    {
      id: '9',
      title: '디지털 마케팅 전략 A to Z',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Marketing',
      instructorName: '서마케터',
      rating: 4.6,
      reviewCount: 1123,
      price: 66000,
      isFree: false,
      category: 'productivity',
      level: 'intermediate',
      description: '디지털 마케팅의 모든 것을 배우는 강의',
    },
    {
      id: '10',
      title: 'SQL 데이터베이스 기초',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=SQL',
      instructorName: '이디비',
      rating: 4.7,
      reviewCount: 1456,
      price: 0,
      isFree: true,
      category: 'data-science',
      level: 'beginner',
      description: 'SQL 기초부터 실무 쿼리까지',
    },
    {
      id: '11',
      title: '머신러닝 입문 with Python',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=ML',
      instructorName: '박머신',
      rating: 4.8,
      reviewCount: 987,
      price: 99000,
      isFree: false,
      category: 'ai-tech',
      level: 'intermediate',
      description: '머신러닝의 기초부터 실전 프로젝트까지',
    },
    {
      id: '12',
      title: 'AWS 클라우드 실전 가이드',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=AWS',
      instructorName: '최클라우드',
      rating: 4.9,
      reviewCount: 678,
      price: 77000,
      isFree: false,
      category: 'it-programming',
      level: 'advanced',
      description: 'AWS 서비스를 실무에서 활용하는 방법',
    },
    {
      id: '13',
      title: '프리랜서를 위한 포트폴리오 제작',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Portfolio',
      instructorName: '한프리',
      rating: 4.6,
      reviewCount: 456,
      price: 0,
      isFree: true,
      category: 'productivity',
      level: 'beginner',
      description: '눈에 띄는 포트폴리오 만들기',
    },
    {
      id: '14',
      title: 'Vue.js 3 완벽 가이드',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Vue',
      instructorName: '강뷰',
      rating: 4.7,
      reviewCount: 834,
      price: 55000,
      isFree: false,
      category: 'it-programming',
      level: 'intermediate',
      description: 'Vue.js 3의 모든 것',
    },
    {
      id: '15',
      title: '딥러닝 기초부터 실전까지',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=DeepLearning',
      instructorName: '정딥러닝',
      rating: 4.9,
      reviewCount: 1234,
      price: 110000,
      isFree: false,
      category: 'ai-tech',
      level: 'advanced',
      description: '딥러닝의 이론과 실습',
    },
    {
      id: '16',
      title: 'Git & GitHub 완전 정복',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Git',
      instructorName: '이깃',
      rating: 4.8,
      reviewCount: 2156,
      price: 0,
      isFree: true,
      category: 'it-programming',
      level: 'beginner',
      description: '버전 관리의 기초부터 협업까지',
    },
    {
      id: '17',
      title: '라즈베리파이로 시작하는 IoT',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=RaspberryPi',
      instructorName: '김하드웨어',
      rating: 4.5,
      reviewCount: 345,
      price: 44000,
      isFree: false,
      category: 'hardware',
      level: 'intermediate',
      description: '라즈베리파이로 IoT 프로젝트 만들기',
    },
    {
      id: '18',
      title: 'Notion 업무 생산성 향상',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Notion',
      instructorName: '박노션',
      rating: 4.6,
      reviewCount: 1678,
      price: 0,
      isFree: true,
      category: 'productivity',
      level: 'beginner',
      description: 'Notion으로 업무 효율 10배 높이기',
    },
    {
      id: '19',
      title: 'Flutter 모바일 앱 개발',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Flutter',
      instructorName: '최플러터',
      rating: 4.7,
      reviewCount: 923,
      price: 77000,
      isFree: false,
      category: 'it-programming',
      level: 'intermediate',
      description: 'Flutter로 크로스플랫폼 앱 개발하기',
    },
    {
      id: '20',
      title: '엑셀 데이터 분석 마스터',
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Excel',
      instructorName: '서엑셀',
      rating: 4.8,
      reviewCount: 2890,
      price: 0,
      isFree: true,
      category: 'productivity',
      level: 'beginner',
      description: '엑셀로 데이터 분석 전문가 되기',
    },
  ];

  async findAll(): Promise<DummyCourse[]> {
    return this.courses;
  }

  async findById(id: string): Promise<DummyCourse | undefined> {
    return this.courses.find((course) => course.id === id);
  }

  async findByIds(ids: string[]): Promise<DummyCourse[]> {
    return this.courses.filter((course) => ids.includes(course.id));
  }

  async findByCategory(category: string): Promise<DummyCourse[]> {
    if (category === 'all') return this.courses;
    return this.courses.filter((course) => course.category === category);
  }

  async findByLevel(level: string): Promise<DummyCourse[]> {
    if (level === 'all') return this.courses;
    return this.courses.filter((course) => course.level === level);
  }

  async findFree(): Promise<DummyCourse[]> {
    return this.courses.filter((course) => course.isFree);
  }
}
