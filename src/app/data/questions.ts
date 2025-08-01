export interface GREQuestion {
  id: string;
  title: string;
  prompt: string;
  category: 'issue' | 'argument';
  difficulty: 'easy' | 'medium' | 'hard';
}

export const greQuestions: GREQuestion[] = [
  {
    id: 'technology-communication',
    title: 'Technology & Communication',
    prompt: "Do you agree or disagree with the following statement? 'Technology has made communication between people better than ever before.' Support your response with reasons and examples.",
    category: 'issue',
    difficulty: 'medium'
  },
  {
    id: 'education-online-learning',
    title: 'Online Learning',
    prompt: "Some people believe that online education is as effective as traditional classroom learning, while others argue that it cannot replace the benefits of face-to-face instruction. Which view do you find more compelling? Use specific reasons and examples to support your position.",
    category: 'issue',
    difficulty: 'medium'
  },
  {
    id: 'social-media-mental-health',
    title: 'Social Media Impact',
    prompt: "To what extent do you agree or disagree with the following statement? 'Social media has a negative impact on mental health and well-being.' Support your position with specific reasons and examples.",
    category: 'issue',
    difficulty: 'hard'
  },
  {
    id: 'remote-work-productivity',
    title: 'Remote Work Productivity',
    prompt: "Some companies have found that allowing employees to work from home increases productivity, while others believe that in-office work is more effective. Which approach do you think is better for most organizations? Support your view with specific reasons and examples.",
    category: 'issue',
    difficulty: 'medium'
  },
  {
    id: 'environmental-responsibility',
    title: 'Environmental Responsibility',
    prompt: "Do you agree or disagree with the following statement? 'Individuals have a responsibility to reduce their environmental impact, even if it requires significant lifestyle changes.' Support your response with specific reasons and examples.",
    category: 'issue',
    difficulty: 'hard'
  },
  {
    id: 'artificial-intelligence-jobs',
    title: 'AI & Job Market',
    prompt: "Some people believe that artificial intelligence will create more jobs than it eliminates, while others argue that AI will lead to widespread unemployment. Which view do you find more compelling? Use specific reasons and examples to support your position.",
    category: 'issue',
    difficulty: 'hard'
  },
  {
    id: 'standardized-testing',
    title: 'Standardized Testing',
    prompt: "To what extent do you agree or disagree with the following statement? 'Standardized tests are an effective way to measure student learning and academic achievement.' Support your position with specific reasons and examples.",
    category: 'issue',
    difficulty: 'medium'
  },
  {
    id: 'government-regulation',
    title: 'Government Regulation',
    prompt: "Some people believe that government regulation is necessary to protect consumers and the environment, while others argue that excessive regulation stifles innovation and economic growth. Which view do you find more compelling? Support your position with specific reasons and examples.",
    category: 'issue',
    difficulty: 'hard'
  }
];

export const getQuestionById = (id: string): GREQuestion | undefined => {
  return greQuestions.find(question => question.id === id);
}; 