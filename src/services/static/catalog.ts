import { approvals } from '@/data/approvals'
import { articles } from '@/data/articles'
import { colleges } from '@/data/colleges'
import { courses } from '@/data/courses'
import { homeCuration } from '@/data/curation'
import { modeGuides } from '@/data/modeGuides'
import { streams } from '@/data/streams'
import { universities } from '@/data/universities'
import type {
  ApprovalInfo,
  CatalogStats,
  HomeHighlights,
  StreamSummary,
  StudyModeGuide,
} from '@/types/dto'
import {
  findCollege,
  findCourse,
  findUniversity,
  toArticleSummary,
  toCollegeSummary,
  toCourseSummary,
  toUniversitySummary,
} from './derive'

/*
 * Static implementation of the catalogue service.
 * Every function is async so the Phase 2 API implementation can replace it without
 * changing callers.
 */

export async function getStreams(): Promise<StreamSummary[]> {
  return streams.map((stream) => ({
    slug: stream.slug,
    name: stream.name,
    courseCount: courses.filter((course) => course.streamId === stream.id).length,
  }))
}

export async function getStudyModeGuides(): Promise<StudyModeGuide[]> {
  return modeGuides
}

export async function getApprovals(): Promise<ApprovalInfo[]> {
  return approvals.map(({ code, name, summary, howToCheck }) => ({
    code,
    name,
    summary,
    howToCheck,
  }))
}

export async function getCatalogStats(): Promise<CatalogStats> {
  return { courses: courses.length, universities: universities.length, colleges: colleges.length }
}

export async function getHomeHighlights(): Promise<HomeHighlights> {
  const sortedArticles = [...articles].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn))
  const featured = articles.find((article) => article.id === homeCuration.featuredArticleId)
  return {
    courses: homeCuration.courseIds.map((id) => toCourseSummary(findCourse(id))),
    universities: homeCuration.universityIds.map((id) => toUniversitySummary(findUniversity(id))),
    colleges: homeCuration.collegeIds.map((id) => toCollegeSummary(findCollege(id))),
    comparePreview: homeCuration.comparePreviewUniversityIds.map((id) =>
      toUniversitySummary(findUniversity(id)),
    ),
    routes: homeCuration.routes.map(([from, to]) => ({
      from: toCourseSummary(findCourse(from)),
      to: toCourseSummary(findCourse(to)),
    })),
    featuredArticle: featured ? toArticleSummary(featured) : null,
    recentArticles: sortedArticles
      .filter((article) => article.id !== featured?.id)
      .slice(0, 3)
      .map(toArticleSummary),
  }
}

export async function getPopularSearches(): Promise<string[]> {
  return homeCuration.popularSearches
}
